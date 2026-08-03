import { describe, it, expect, beforeEach } from 'vitest';
import { prisma } from '../../../../tests/helpers/test-database';
import { roleService } from '../role.service';

const testActor = {
  id: '',
  email: 'admin@example.test',
  roleName: 'Super Administrator'
};

describe('Role Service Integration Tests', () => {
  beforeEach(async () => {
    const adminUser = await prisma.adminUser.findUnique({ where: { email: 'admin@example.test' } });
    if (adminUser) {
      testActor.id = adminUser.id;
    }
  });

  it('should assign and revoke role-permissions transactionally', async () => {
    // 1. Create a custom role
    const role = await roleService.createRole({
      name: 'Custom Admin User',
      description: 'Custom admin role for settings updates',
      isActive: true,
    }, testActor);

    const perms = await prisma.permission.findMany({ take: 3 });
    const permIds = perms.map((p) => p.id);

    // 2. Assign permissions (returns void — verify via DB state)
    await roleService.updateRolePermissions(role.id, permIds, 'Initial setup of Custom Admin', testActor);

    // Verify database record mappings
    const mappingsAfterAssign = await prisma.rolePermission.findMany({ where: { roleId: role.id } });
    expect(mappingsAfterAssign.length).toBe(3);

    // 3. Revoke permissions (assign empty)
    await roleService.updateRolePermissions(role.id, [], 'Revoking custom permission rights', testActor);
    const mappingsAfterRevoke = await prisma.rolePermission.findMany({ where: { roleId: role.id } });
    expect(mappingsAfterRevoke.length).toBe(0);
  });

  it('should prevent archiving system-protected roles', async () => {
    const adminRole = await prisma.role.findFirst({ where: { name: 'Super Administrator' } });
    expect(adminRole).toBeDefined();
    expect(adminRole?.isProtected).toBe(true);

    await expect(
      roleService.archiveRole(adminRole!.id, 'Clean old roles', testActor)
    ).rejects.toThrow(/cannot be archived/);
  });

  it('should enforce final qualified administrator lockout guard', async () => {
    // 1. Create a custom role and assign all critical permissions
    const role = await roleService.createRole({
      name: 'Secondary Admin Role',
      isActive: true,
    }, testActor);

    const criticalPerms = await prisma.permission.findMany({
      where: {
        code: {
          in: ['role.view', 'role.edit', 'permission.view', 'permission.assign']
        }
      }
    });
    const criticalIds = criticalPerms.map((p) => p.id);
    await roleService.updateRolePermissions(role.id, criticalIds, 'Assign critical tools', testActor);

    // 2. Assign a custom active user to this role
    const mockUser = await prisma.adminUser.create({
      data: {
        fullName: 'Secondary Admin',
        email: 'secondary@example.test',
        passwordHash: 'dummy-hash',
        roleId: role.id,
        status: 'ACTIVE',
      }
    });

    // 3. Deactivate the primary seeded administrator user to leave mockUser as the ONLY active admin
    await prisma.adminUser.update({
      where: { email: 'admin@example.test' },
      data: { status: 'SUSPENDED' }
    });

    // 4. Attempting to strip critical permissions on this secondary admin role must fail under lockout rule
    await expect(
      roleService.updateRolePermissions(role.id, [], 'Strip settings access', testActor)
    ).rejects.toThrow(/Cannot strip critical permission-management access/);

    // Clean up suspended state
    await prisma.adminUser.update({
      where: { email: 'admin@example.test' },
      data: { status: 'ACTIVE' }
    });
  });

  it('should roll back all permission changes when one operation fails', async () => {
    const role = await roleService.createRole({
      name: 'Rollback Tester Role',
      isActive: true,
    }, testActor);

    const perms = await prisma.permission.findMany({ take: 2 });
    const permIds = perms.map((p) => p.id);

    // Initial setup (verify 0 mapped)
    const initialMapping = await prisma.rolePermission.findMany({ where: { roleId: role.id } });
    expect(initialMapping.length).toBe(0);

    // Attempt transactional update passing one valid ID and one INVALID ID.
    // The entire update matrix should fail and rollback, leaving 0 items mapped.
    const badIds = [permIds[0], 'invalid-permission-id-12345'];
    
    await expect(
      roleService.updateRolePermissions(role.id, badIds, 'Failing assignment', testActor)
    ).rejects.toThrow();

    const mappingsAfterFail = await prisma.rolePermission.findMany({ where: { roleId: role.id } });
    expect(mappingsAfterFail.length).toBe(0); // verified rollback!
  });
});
