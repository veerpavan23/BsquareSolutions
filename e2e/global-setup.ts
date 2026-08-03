import { rebuildTestDatabase, prisma } from '../tests/helpers/test-database';

export default async function globalSetup(): Promise<void> {
  (process.env as any).NODE_ENV = 'test';
  process.env.ALLOW_TEST_DB_RESET = 'true';
  process.env.DATABASE_URL = 'file:./test.db';

  console.log('Playwright Global Setup: Initializing test database...');
  await rebuildTestDatabase();
  console.log('Playwright Global Setup: Complete.');

  // Disconnect the prisma client to ensure no hanging connections
  await prisma.$disconnect();
}
