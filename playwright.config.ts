import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false,
  workers: 1,

  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: {
    command: `node "${process.env.NODE_PATH || 'C:/Program Files/sf/client'}/node_modules/npm/bin/npm-cli.js" run dev:test`,
    url: "http://127.0.0.1:3100/admin/login",
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      NODE_ENV: "test",
      APP_ENV: "test",
      ALLOW_TEST_DB_RESET: "true",
      DATABASE_URL: "file:./test.db",
      AUTH_SECRET: "super-secret-auth-key-value-123456",
      BOOTSTRAP_ADMIN_EMAIL: "admin@bsquaresolutions.com",
      BOOTSTRAP_ADMIN_PASSWORD: "bsquareSecurePass123!",
      BOOTSTRAP_ADMIN_NAME: "Super Administrator",
    },
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      }
    },
    {
      name: "authenticated-admin",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/super-admin.json",
      },
      testMatch: /admin\.spec\.ts/,
    },
    {
      name: "unauthenticated",
      use: {
        ...devices["Desktop Chrome"],
        storageState: {
          cookies: [],
          origins: [],
        },
      },
      testMatch: /unauthenticated\.spec\.ts/,
    },
  ],
});
