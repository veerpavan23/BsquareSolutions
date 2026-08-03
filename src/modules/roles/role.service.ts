import { prisma } from '@/lib/prisma';
import { roleRepository } from './role.repository';
import { auditService } from '../audit/audit.service';
import { AuditAction, Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from './role.types';
import { ValidationError, ConflictError, BusinessRuleError, NotFoundError } from '@/lib/errors/errors';

export class RoleService {
  async getRoleList() {
    const list = await roleRepository.findMany();
    // For each role, let's load mapping metrics
    const rolesWithMetrics = await Promise.all(
      list.map(async (role) => {
        const userCount = await roleRepository.countActiveUsers(role.id);
        const matrix = await roleRepository.findPermissionMatrix(role.id);
        return {
          ...role,
          userCount,
          permissionCount: matrix.length,
        };
      })
    );
    return rolesWithMetrics;
  }

  async getRolePermissionMatrix(roleId: string) {
    const role = await roleRepository.findById(roleId);
    if (!role) {
      throw new NotFoundError('Role not found');
    }

    const allPermissions = await roleRepository.findPermissions();
    const rolePermissions = await roleRepository.findPermissionMatrix(roleId);
    const assignedIds = rolePermissions.map((rp) => rp.permissionId);

    return {
      role,
      matrix: allPermissions.map((perm) => ({
        id: perm.id,
        code: perm.code,
        description: perm.description,
        isAssigned: assignedIds.includes(perm.id),
      })),
    };
  }

  async getRoleById(id: string): Promise<Role> {
    const role = await roleRepository.findById(id);
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    return role;
  }

  async createRole(data: CreateRoleDto, actor: any): Promise<Role> {
    const name = data.name.trim();
    const existing = await roleRepository.findByName(name);
    if (existing) {
      throw new ConflictError(`Role name '${name}' already exists.`);
    }

    const newRole = await roleRepository.create(data);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.CREATE_RECORD,
      module: 'roles',
      entityType: 'Role',
      entityId: newRole.id,
      entityLabel: newRole.name,
      newValue: newRole,
      success: true,
    });

    return newRole;
  }

  async updateRole(id: string, data: UpdateRoleDto, actor: any): Promise<Role> {
    const existing = await roleRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Role not found');
    }

    if (existing.isSystemRole) {
      throw new BusinessRuleError('System roles are protected and cannot be renamed or modified.');
    }

    if (data.name) {
      const name = data.name.trim();
      const duplicate = await roleRepository.findByName(name);
      if (duplicate && duplicate.id !== id) {
        throw new ConflictError(`Role name '${name}' already exists.`);
      }
    }

    // Lockout check if deactivating role
    if (data.isActive === false) {
      const criticalPermissions = [
        'role.view',
        'role.edit',
        'permission.view',
        'permission.assign',
      ];
      const rolePermissions = await roleRepository.findPermissionMatrix(id);
      const hasCritical = rolePermissions.some((rp) => criticalPermissions.includes(rp.permission.code));
      
      if (hasCritical) {
        const qualifiedAdmins = await roleRepository.findUsersWithCriticalPermissions();
        const otherQualified = qualifiedAdmins.filter((u) => u.roleId !== id);
        if (otherQualified.length === 0) {
          throw new BusinessRuleError('Cannot deactivate role: this role is the last active role containing critical administration permissions.');
        }
      }
    }

    const updatedRole = await roleRepository.update(id, data);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'roles',
      entityType: 'Role',
      entityId: id,
      entityLabel: updatedRole.name,
      previousValue: existing,
      newValue: updatedRole,
      success: true,
    });

    return updatedRole;
  }

  async updateRolePermissions(
    roleId: string,
    permissionIds: string[],
    reason: string,
    actor: any
  ): Promise<void> {
    const role = await roleRepository.findById(roleId);
    if (!role) {
      throw new NotFoundError('Role not found');
    }

    if (role.isProtected) {
      throw new BusinessRuleError('The Super Administrator role permission scope is protected and cannot be modified.');
    }

    const allPermissions = await roleRepository.findPermissions();
    const currentMappings = await roleRepository.findPermissionMatrix(roleId);
    const currentIds = currentMappings.map((rp) => rp.permissionId);

    // Lockout Rule Check
    const criticalPermissions = [
      'role.view',
      'role.edit',
      'permission.view',
      'permission.assign',
    ];

    const newAssignedCodes = allPermissions
      .filter((p) => permissionIds.includes(p.id))
      .map((p) => p.code);

    const stripsCritical = criticalPermissions.some((code) => !newAssignedCodes.includes(code));

    if (stripsCritical) {
      const qualifiedAdmins = await roleRepository.findUsersWithCriticalPermissions();
      const otherQualified = qualifiedAdmins.filter((user) => user.roleId !== roleId);
      
      if (otherQualified.length === 0) {
        throw new BusinessRuleError(
          'Cannot strip critical permission-management access: at least one active user must retain the complete administrative permission set to prevent permanent system lockout.'
        );
      }
    }

    // Compute diff for audit log
    const addedIds = permissionIds.filter((id) => !currentIds.includes(id));
    const removedIds = currentIds.filter((id) => !permissionIds.includes(id));

    const addedCodes = allPermissions.filter((p) => addedIds.includes(p.id)).map((p) => p.code);
    const removedCodes = allPermissions.filter((p) => removedIds.includes(p.id)).map((p) => p.code);

    await prisma.$transaction(async (tx) => {
      await roleRepository.replacePermissions(roleId, permissionIds, tx);

      // Audit Log mapping update
      await auditService.logEvent({
        actorUserId: actor.id,
        actorEmail: actor.email,
        actorRole: actor.roleName,
        action: AuditAction.PERMISSION_UPDATE,
        module: 'roles',
        entityType: 'Role',
        entityId: roleId,
        entityLabel: role.name,
        metadata: {
          permissionsAdded: addedCodes,
          permissionsRemoved: removedCodes,
        },
        reason,
        success: true,
      }, tx);
    });
  }

  async archiveRole(id: string, reason: string, actor: any): Promise<Role> {
    const role = await roleRepository.findById(id);
    if (!role) {
      throw new NotFoundError('Role not found');
    }

    if (role.isSystemRole || role.isProtected) {
      throw new BusinessRuleError('System protected roles cannot be archived.');
    }

    const activeUsersCount = await roleRepository.countActiveUsers(id);
    if (activeUsersCount > 0) {
      throw new BusinessRuleError(`Cannot archive role '${role.name}' because it has ${activeUsersCount} active users assigned to it. Reassign them first.`);
    }

    const archivedRole = await roleRepository.archive(id);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.DELETE_RECORD,
      module: 'roles',
      entityType: 'Role',
      entityId: id,
      entityLabel: role.name,
      previousValue: role,
      newValue: archivedRole,
      reason: `Role Archived: ${reason}`,
      success: true,
    });

    return archivedRole;
  }
}

export const roleService = new RoleService();
