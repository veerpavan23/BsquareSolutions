import { spawnSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { seedTestDatabase } from './seed-test-database';

const projectRoot = path.resolve(__dirname, '../../');
const prismaDir = path.join(projectRoot, 'prisma');

// Shared single instance of PrismaClient for integration tests
export const prisma = new PrismaClient();

export function assertSafeTestDatabase(): void {
  const databaseUrl = process.env.DATABASE_URL ?? '';
  const isTestEnv = process.env.NODE_ENV === 'test' || process.env.APP_ENV === 'test';

  if (!isTestEnv || !databaseUrl.includes('test.db') || process.env.ALLOW_TEST_DB_RESET !== 'true') {
    throw new Error(
      `Unsafe test database configuration. Refusing operation. NODE_ENV=${process.env.NODE_ENV}, APP_ENV=${process.env.APP_ENV}, URL=${databaseUrl}`
    );
  }
}

export async function removeTestDatabaseFiles(): Promise<void> {
  assertSafeTestDatabase();

  const files = [
    'test.db',
    'test.db-journal',
    'test.db-shm',
    'test.db-wal'
  ];

  for (const file of files) {
    const filePath = path.join(prismaDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        // ignore if locked or not available
      }
    }
  }
}

export async function applyTestMigrations(): Promise<void> {
  assertSafeTestDatabase();

  const prismaCliPath = path.join(projectRoot, 'node_modules/prisma/build/index.js');
  const result = spawnSync(
    process.execPath,
    [prismaCliPath, 'migrate', 'deploy'],
    {
      cwd: projectRoot,
      env: { ...process.env, DATABASE_URL: 'file:./test.db' },
      encoding: 'utf8',
      stdio: 'pipe'
    }
  );

  if (result.status !== 0) {
    console.error('Prisma Migrate Deploy Output:', result.stdout);
    console.error('Prisma Migrate Deploy Error:', result.stderr);
    if (result.error) {
      console.error('Spawn Error:', result.error);
    }
    throw new Error(`Prisma migrations deployment failed with exit code ${result.status}`);
  }
}

export async function seedImmutableTestData(): Promise<void> {
  assertSafeTestDatabase();
  await seedTestDatabase(prisma);
}

export async function rebuildTestDatabase(): Promise<void> {
  assertSafeTestDatabase();
  await removeTestDatabaseFiles();
  await applyTestMigrations();
  await seedImmutableTestData();
}

export async function createBaselineTestBranches(tx: any): Promise<void> {
  // Test physical HQ
  await tx.branch.create({
    data: {
      branchCode: 'TEST-HQ',
      branchName: 'Test Head Office HQ',
      slug: 'test-head-office-hq',
      branchType: 'HEAD_OFFICE',
      addressLine1: '123 HQ Street',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      phone: '+91 99999 99999',
      email: 'hq@test.com',
      isHeadOffice: true,
      isActive: true,
      displayOrder: 1
    }
  });

  // Test online virtual branch
  await tx.branch.create({
    data: {
      branchCode: 'TEST-ONLINE',
      branchName: 'Test Online Campus',
      slug: 'test-online-campus',
      branchType: 'ONLINE',
      addressLine1: 'Virtual Campus',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      phone: '+91 88888 88888',
      email: 'online@test.com',
      isHeadOffice: false,
      isActive: true,
      displayOrder: 2
    }
  });
}

export async function resetMutableTestData(): Promise<void> {
  assertSafeTestDatabase();

  await prisma.$transaction(async (tx) => {
    // Delete in dependency order
    await tx.batchChangeLog.deleteMany();
    await tx.batchWaitlistEntry.deleteMany();
    await tx.batchTrainer.deleteMany();
    await tx.batchSchedule.deleteMany();
    await tx.batch.deleteMany();
    await tx.classroom.deleteMany();
    await tx.branch.deleteMany();

    // Clear audit logs and sessions
    await tx.auditLog.deleteMany();
    await tx.passwordResetToken.deleteMany();
    await tx.adminSession.deleteMany();

    // Remove test-created admin users (non-seed users)
    await tx.adminUser.deleteMany({
      where: { email: { not: 'admin@example.test' } },
    });

    // Remove role-permission mappings for non-system roles
    await tx.rolePermission.deleteMany({
      where: {
        role: { isSystemRole: false, isProtected: false },
      },
    });

    // Remove non-system/non-protected roles created by tests
    await tx.role.deleteMany({
      where: { isSystemRole: false, isProtected: false },
    });

    // Recreate baseline locations
    await createBaselineTestBranches(tx);
  });
}
