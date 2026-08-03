import { prisma } from '@/lib/prisma';
import { Role, Permission, RolePermission, AdminUser } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from './role.types';

export class RoleRepository {
  async findMany(): Promise<Role[]> {
    return await prisma.role.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string, tx?: any): Promise<Role | null> {
    const client = tx || prisma;
    return await client.role.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findByName(name: string): Promise<Role | null> {
    return await prisma.role.findFirst({
      where: { name: { equals: name }, deletedAt: null },
    });
  }

  async findPermissions(): Promise<Permission[]> {
    return await prisma.permission.findMany({
      orderBy: { code: 'asc' },
    });
  }

  async findPermissionMatrix(roleId: string): Promise<(RolePermission & { permission: Permission })[]> {
    return await prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
  }

  async create(data: CreateRoleDto, tx?: any): Promise<Role> {
    const client = tx || prisma;
    return await client.role.create({
      data: {
        name: data.name.trim(),
        description: data.description?.trim(),
        isSystemRole: data.isSystemRole || false,
        isProtected: data.isProtected || false,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async update(id: string, data: UpdateRoleDto, tx?: any): Promise<Role> {
    const client = tx || prisma;
    return await client.role.update({
      where: { id },
      data: {
        name: data.name?.trim(),
        description: data.description?.trim(),
        isActive: data.isActive,
      },
    });
  }

  async replacePermissions(roleId: string, permissionIds: string[], tx?: any): Promise<void> {
    const client = tx || prisma;

    // Delete existing mappings
    await client.rolePermission.deleteMany({
      where: { roleId },
    });

    // Bulk create new mappings
    if (permissionIds.length > 0) {
      await client.rolePermission.createMany({
        data: permissionIds.map((permId) => ({
          roleId,
          permissionId: permId,
        })),
      });
    }
  }

  async countActiveUsers(roleId: string): Promise<number> {
    return await prisma.adminUser.count({
      where: {
        roleId,
        status: 'ACTIVE',
        deletedAt: null,
      },
    });
  }

  async findUsersWithCriticalPermissions(excludeUserId?: string): Promise<AdminUser[]> {
    const criticalPermissions = [
      'role.view',
      'role.edit',
      'permission.view',
      'permission.assign',
    ];

    const activeUsers = await prisma.adminUser.findMany({
      where: {
        status: 'ACTIVE',
        deletedAt: null,
        ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    return activeUsers.filter((user) => {
      const userPermCodes = user.role.permissions.map((rp) => rp.permission.code);
      return criticalPermissions.every((code) => userPermCodes.includes(code));
    });
  }

  async archive(id: string, tx?: any): Promise<Role> {
    const client = tx || prisma;
    return await client.role.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }
}

export const roleRepository = new RoleRepository();
