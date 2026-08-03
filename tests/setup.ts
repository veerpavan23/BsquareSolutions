import { beforeEach, afterEach } from 'vitest';
import { resetMutableTestData } from './helpers/test-database';

beforeEach(async () => {
  // Clear and re-initialize test data isolation before each integration test runs
  await resetMutableTestData();
});

afterEach(async () => {
  // Restores all mocked global timers, interfaces, etc.
});
