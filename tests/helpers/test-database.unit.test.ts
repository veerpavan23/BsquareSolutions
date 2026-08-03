import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { assertSafeTestDatabase } from './test-database';

describe('assertSafeTestDatabase Safety Guard', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should pass when NODE_ENV=test, ALLOW_TEST_DB_RESET=true and DATABASE_URL contains test.db', () => {
    (process.env as any).NODE_ENV = 'test';
    process.env.ALLOW_TEST_DB_RESET = 'true';
    process.env.DATABASE_URL = 'file:./test.db';

    expect(() => assertSafeTestDatabase()).not.toThrow();
  });

  it('should pass when APP_ENV=test, ALLOW_TEST_DB_RESET=true and DATABASE_URL contains test.db', () => {
    delete (process.env as any).NODE_ENV;
    process.env.APP_ENV = 'test';
    process.env.ALLOW_TEST_DB_RESET = 'true';
    process.env.DATABASE_URL = 'file:./test.db';

    expect(() => assertSafeTestDatabase()).not.toThrow();
  });

  it('should throw when DATABASE_URL is dev.db', () => {
    (process.env as any).NODE_ENV = 'test';
    process.env.ALLOW_TEST_DB_RESET = 'true';
    process.env.DATABASE_URL = 'file:./dev.db';

    expect(() => assertSafeTestDatabase()).toThrow(/Unsafe test database configuration/);
  });

  it('should throw when ALLOW_TEST_DB_RESET is absent or false', () => {
    (process.env as any).NODE_ENV = 'test';
    process.env.DATABASE_URL = 'file:./test.db';
    delete (process.env as any).ALLOW_TEST_DB_RESET;

    expect(() => assertSafeTestDatabase()).toThrow(/Unsafe test database configuration/);

    process.env.ALLOW_TEST_DB_RESET = 'false';
    expect(() => assertSafeTestDatabase()).toThrow(/Unsafe test database configuration/);
  });

  it('should throw when not in test environment', () => {
    (process.env as any).NODE_ENV = 'production';
    process.env.ALLOW_TEST_DB_RESET = 'true';
    process.env.DATABASE_URL = 'file:./test.db';

    expect(() => assertSafeTestDatabase()).toThrow(/Unsafe test database configuration/);
  });
});
