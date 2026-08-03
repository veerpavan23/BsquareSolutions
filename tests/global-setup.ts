import { rebuildTestDatabase, prisma } from './helpers/test-database';

export default async function globalSetup() {
  (process.env as any).NODE_ENV = 'test';
  process.env.ALLOW_TEST_DB_RESET = 'true';
  process.env.DATABASE_URL = 'file:./test.db';

  console.log('Vitest Global Setup: Rebuilding test database (test.db)...');
  await rebuildTestDatabase();
  console.log('Vitest Global Setup: Test database ready.');

  return async () => {
    console.log('Vitest Global Teardown: Disconnecting Prisma client...');
    await prisma.$disconnect();
  };
}
