import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Load bootstrap parameters from process.env
  const adminEmail = process.env.BOOTSTRAP_ADMIN_EMAIL;
  const adminPassword = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  const adminName = process.env.BOOTSTRAP_ADMIN_NAME || 'Super Admin';

  if (!adminEmail || !adminPassword) {
    throw new Error(
      'Missing BOOTSTRAP_ADMIN_EMAIL or BOOTSTRAP_ADMIN_PASSWORD environment variables'
    );
  }

  // 2. Define permissions list
  const permissions = [
    { code: 'branch.view', description: 'View branches' },
    { code: 'branch.create', description: 'Create branches' },
    { code: 'branch.edit', description: 'Edit branches' },
    { code: 'branch.archive', description: 'Archive branches' },
    { code: 'branch.restore', description: 'Restore branches' },
    
    { code: 'classroom.view', description: 'View classrooms' },
    { code: 'classroom.create', description: 'Create classrooms' },
    { code: 'classroom.edit', description: 'Edit classrooms' },
    { code: 'classroom.archive', description: 'Archive classrooms' },
    { code: 'classroom.restore', description: 'Restore classrooms' },

    { code: 'role.view', description: 'View roles' },
    { code: 'role.create', description: 'Create roles' },
    { code: 'role.edit', description: 'Edit roles' },
    { code: 'role.archive', description: 'Archive roles' },
    { code: 'permission.view', description: 'View permissions' },
    { code: 'permission.assign', description: 'Assign permissions to roles' },
    
    { code: 'course.create', description: 'Create courses' },
    { code: 'course.edit', description: 'Edit courses' },
    { code: 'course.submit_review', description: 'Submit courses for review' },
    { code: 'course.review', description: 'Review course modifications' },
    { code: 'course.approve', description: 'Approve courses' },
    { code: 'course.reject', description: 'Reject courses' },
    { code: 'course.publish', description: 'Publish courses to public website' },
    { code: 'course.unpublish', description: 'Unpublish active courses' },
    { code: 'course.archive', description: 'Archive old courses' },
    { code: 'course.restore', description: 'Restore archived courses' },
    
    { code: 'media.view', description: 'View media library assets' },
    { code: 'media.upload', description: 'Upload media library files' },
    { code: 'media.edit', description: 'Modify media metadata' },
    { code: 'media.archive', description: 'Archive media files' },
    { code: 'media.delete', description: 'Hard delete media assets' },
    
    { code: 'settings.view', description: 'View website and portal settings' },
    { code: 'settings.edit', description: 'Edit non-secret configuration parameters' },
    { code: 'settings.secret.manage', description: 'View and update secret system configurations' },
    
    { code: 'notification.view', description: 'View in-app and queued notifications' },
    { code: 'notification.manage', description: 'Trigger or update notification status' },
    { code: 'notification.template.manage', description: 'Manage notification templates' },
    
    { code: 'activity.view', description: 'View administrative activity timeline logs' },
    
    { code: 'feature_flag.view', description: 'View feature flag states' },
    { code: 'feature_flag.manage', description: 'Toggle feature flag environments and states' },
    
    { code: 'data.import', description: 'Import data from external files' },
    { code: 'data.export', description: 'Export standard database records' },
    { code: 'sensitive_data.export', description: 'Export personal data and security audit logs' },
  ];

  console.log('Seeding permissions...');
  const seededPermissions = [];
  for (const perm of permissions) {
    const dbPerm = await prisma.permission.upsert({
      where: { code: perm.code },
      update: { description: perm.description },
      create: { code: perm.code, description: perm.description },
    });
    seededPermissions.push(dbPerm);
  }

  // 3. Define and seed roles
  console.log('Seeding roles...');
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'Super Administrator' },
    update: {
      description: 'Full access to all system functions',
      isSystemRole: true,
      isProtected: true,
      isActive: true,
    },
    create: {
      name: 'Super Administrator',
      description: 'Full access to all system functions',
      isSystemRole: true,
      isProtected: true,
      isActive: true,
    },
  });

  const courseManagerRole = await prisma.role.upsert({
    where: { name: 'Course Manager' },
    update: {
      description: 'Create and edit courses, manage batches',
      isSystemRole: true,
      isProtected: false,
      isActive: true,
    },
    create: {
      name: 'Course Manager',
      description: 'Create and edit courses, manage batches',
      isSystemRole: true,
      isProtected: false,
      isActive: true,
    },
  });

  const websiteAdminRole = await prisma.role.upsert({
    where: { name: 'Website Administrator' },
    update: {
      description: 'Review changes and manage content sections',
      isSystemRole: true,
      isProtected: false,
      isActive: true,
    },
    create: {
      name: 'Website Administrator',
      description: 'Review changes and manage content sections',
      isSystemRole: true,
      isProtected: false,
      isActive: true,
    },
  });

  // 4. Map permissions to Super Administrator (All permissions)
  console.log('Mapping permissions to roles...');
  for (const perm of seededPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: perm.id,
      },
    });
  }

  // Map Course Manager permissions
  const courseManagerPerms = [
    'branch.view',
    'classroom.view',
    'course.create',
    'course.edit',
    'course.submit_review',
    'media.view',
    'media.upload',
    'notification.view',
    'activity.view',
  ];
  for (const code of courseManagerPerms) {
    const perm = seededPermissions.find((p) => p.code === code);
    if (perm) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: courseManagerRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: courseManagerRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // Map Website Administrator permissions
  const websiteAdminPerms = [
    'branch.view',
    'classroom.view',
    'course.view',
    'course.review',
    'course.approve',
    'course.reject',
    'media.view',
    'media.upload',
    'media.edit',
    'settings.view',
    'settings.edit',
    'activity.view',
  ];
  for (const code of websiteAdminPerms) {
    const perm = seededPermissions.find((p) => p.code === code);
    if (perm) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: websiteAdminRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: websiteAdminRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // 5. Seed default head branch
  console.log('Seeding default Branch...');
  const headBranch = await prisma.branch.upsert({
    where: { branchCode: 'HQ-HYD' },
    update: {
      branchName: 'BSquare Head Office',
      slug: 'bsquare-head-office',
      branchType: 'HEAD_OFFICE',
      addressLine1: '3rd Floor, Silicon Valley Towers',
      addressLine2: 'Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      country: 'India',
      phone: '+91 98765 43210',
      email: 'info@bsquaresolutions.com',
      isHeadOffice: true,
      isActive: true,
    },
    create: {
      branchCode: 'HQ-HYD',
      branchName: 'BSquare Head Office',
      slug: 'bsquare-head-office',
      branchType: 'HEAD_OFFICE',
      addressLine1: '3rd Floor, Silicon Valley Towers',
      addressLine2: 'Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      country: 'India',
      phone: '+91 98765 43210',
      email: 'info@bsquaresolutions.com',
      isHeadOffice: true,
      isActive: true,
    },
  });

  // Seed default online branch
  const onlineBranch = await prisma.branch.upsert({
    where: { branchCode: 'BR-ONL' },
    update: {
      branchName: 'Online Live Classes',
      slug: 'online-live-classes',
      branchType: 'ONLINE',
      addressLine1: 'Virtual Environment',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      country: 'India',
      phone: '+91 98765 43210',
      email: 'online@bsquaresolutions.com',
      isActive: true,
    },
    create: {
      branchCode: 'BR-ONL',
      branchName: 'Online Live Classes',
      slug: 'online-live-classes',
      branchType: 'ONLINE',
      addressLine1: 'Virtual Environment',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      country: 'India',
      phone: '+91 98765 43210',
      email: 'online@bsquaresolutions.com',
      isActive: true,
    },
  });

  // 6. Seed default classrooms
  console.log('Seeding classrooms...');
  await prisma.classroom.upsert({
    where: {
      branchId_classroomCode: {
        branchId: headBranch.id,
        classroomCode: 'CR-101',
      },
    },
    update: {
      classroomName: 'Newton Lab (CR-101)',
      capacity: 35,
      facilities: 'Smartboard, Projector, High-speed Wifi, Workstations',
      isActive: true,
    },
    create: {
      branchId: headBranch.id,
      classroomCode: 'CR-101',
      classroomName: 'Newton Lab (CR-101)',
      capacity: 35,
      facilities: 'Smartboard, Projector, High-speed Wifi, Workstations',
      isActive: true,
    },
  });

  // 7. Hash password and seed bootstrap Super Administrator
  console.log(`Seeding Admin User: ${adminEmail}...`);
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      fullName: adminName,
      passwordHash,
      roleId: superAdminRole.id,
      branchId: headBranch.id,
      status: 'ACTIVE',
    },
    create: {
      fullName: adminName,
      email: adminEmail,
      passwordHash,
      roleId: superAdminRole.id,
      branchId: headBranch.id,
      status: 'ACTIVE',
    },
  });

  // 8. Seed default setting definitions
  console.log('Seeding Settings Definitions...');
  const settings = [
    {
      key: 'site_title',
      category: 'GENERAL' as const,
      label: 'Website Title',
      description: 'The main display title for the public website SEO.',
      valueType: 'STRING' as const,
      defaultValue: 'BSquare Solutions & Services',
      isPublic: true,
    },
    {
      key: 'support_phone',
      category: 'CONTACT' as const,
      label: 'Support Phone Number',
      description: 'The displayed phone number on navbar and headers.',
      valueType: 'STRING' as const,
      defaultValue: '+91 98765 43210',
      isPublic: true,
    },
    {
      key: 'support_email',
      category: 'CONTACT' as const,
      label: 'Support Email Address',
      description: 'The displayed support email address.',
      valueType: 'EMAIL' as const,
      defaultValue: 'support@bsquaresolutions.com',
      isPublic: true,
    },
    {
      key: 'enable_course_approval',
      category: 'FEATURE_FLAGS' as const,
      label: 'Enable Course Approval Workflow',
      description: 'Force course creation to undergo review & approval before publication.',
      valueType: 'BOOLEAN' as const,
      defaultValue: 'true',
      isPublic: false,
    },
  ];

  for (const s of settings) {
    const def = await prisma.settingDefinition.upsert({
      where: { key: s.key },
      update: {
        category: s.category,
        label: s.label,
        description: s.description,
        valueType: s.valueType,
        defaultValue: s.defaultValue,
        isPublic: s.isPublic,
      },
      create: {
        key: s.key,
        category: s.category,
        label: s.label,
        description: s.description,
        valueType: s.valueType,
        defaultValue: s.defaultValue,
        isPublic: s.isPublic,
      },
    });

    await prisma.settingValue.upsert({
      where: { settingKey: def.key },
      update: {},
      create: {
        settingKey: def.key,
        value: s.defaultValue,
      },
    });
  }

  console.log('✅ Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
