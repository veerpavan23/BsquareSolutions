import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function seedTestDatabase(prisma: PrismaClient): Promise<void> {
  // 1. Seed Permissions
  const permissionsData = [
    { code: 'branch.view', description: 'View campus branches' },
    { code: 'branch.create', description: 'Create new branches' },
    { code: 'branch.edit', description: 'Edit existing branch details' },
    { code: 'branch.archive', description: 'Soft delete branches' },
    { code: 'branch.restore', description: 'Restore archived branches' },

    { code: 'classroom.view', description: 'View physical classrooms' },
    { code: 'classroom.create', description: 'Add classrooms to branches' },
    { code: 'classroom.edit', description: 'Modify classroom layouts' },
    { code: 'classroom.archive', description: 'Archive unused classrooms' },
    { code: 'classroom.restore', description: 'Restore archived classrooms' },

    { code: 'role.view', description: 'View administrative roles' },
    { code: 'role.create', description: 'Register custom roles' },
    { code: 'role.edit', description: 'Modify role configurations' },
    { code: 'role.archive', description: 'Archive roles' },

    { code: 'permission.view', description: 'View security permissions list' },
    { code: 'permission.assign', description: 'Modify role-permission matrix' },

    { code: 'course.create', description: 'Manage courses catalog' },
    { code: 'media.view', description: 'Access media library' },
    { code: 'settings.view', description: 'Modify system configurations' },
    { code: 'activity.view', description: 'View audit logs' },
  ];

  const permissionsMap: Record<string, string> = {};

  for (const perm of permissionsData) {
    const record = await prisma.permission.upsert({
      where: { code: perm.code },
      update: { description: perm.description },
      create: { code: perm.code, description: perm.description },
    });
    permissionsMap[perm.code] = record.id;
  }

  // 2. Seed Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'Super Administrator' },
    update: { isSystemRole: true, isProtected: true, isActive: true },
    create: {
      name: 'Super Administrator',
      description: 'Full system authorization controls',
      isSystemRole: true,
      isProtected: true,
      isActive: true,
    },
  });

  const courseManagerRole = await prisma.role.upsert({
    where: { name: 'Course Manager' },
    update: { isSystemRole: true, isProtected: false, isActive: true },
    create: {
      name: 'Course Manager',
      description: 'Manage courses curriculum and trainer schedulers',
      isSystemRole: true,
      isProtected: false,
      isActive: true,
    },
  });

  const webAdminRole = await prisma.role.upsert({
    where: { name: 'Website Administrator' },
    update: { isSystemRole: true, isProtected: false, isActive: true },
    create: {
      name: 'Website Administrator',
      description: 'Configure layout settings and content updates',
      isSystemRole: true,
      isProtected: false,
      isActive: true,
    },
  });

  // 3. Map all permissions to Super Administrator Role
  for (const permCode of Object.keys(permissionsMap)) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permissionsMap[permCode],
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permissionsMap[permCode],
      },
    });
  }

  // Map subsets to Course Manager
  const courseManagerPerms = ['course.create', 'media.view', 'branch.view', 'classroom.view'];
  for (const code of courseManagerPerms) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: courseManagerRole.id,
          permissionId: permissionsMap[code],
        },
      },
      update: {},
      create: {
        roleId: courseManagerRole.id,
        permissionId: permissionsMap[code],
      },
    });
  }

  // 4. Seed Deterministic Users
  const passwordHash = await bcrypt.hash('TestPassword123!', 10);

  // Super Admin
  await prisma.adminUser.upsert({
    where: { email: 'admin@example.test' },
    update: {
      passwordHash,
      roleId: superAdminRole.id,
      status: 'ACTIVE',
    },
    create: {
      fullName: 'Test Super Admin',
      email: 'admin@example.test',
      passwordHash,
      roleId: superAdminRole.id,
      status: 'ACTIVE',
    },
  });

  // Course Manager
  await prisma.adminUser.upsert({
    where: { email: 'manager@example.test' },
    update: {
      passwordHash,
      roleId: courseManagerRole.id,
      status: 'ACTIVE',
    },
    create: {
      fullName: 'Test Course Manager',
      email: 'manager@example.test',
      passwordHash,
      roleId: courseManagerRole.id,
      status: 'ACTIVE',
    },
  });
}
