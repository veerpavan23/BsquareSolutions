import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    maxWorkers: 1,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "src/modules/branches/**/*.ts",
        "src/modules/classrooms/**/*.ts",
        "src/modules/roles/**/*.ts",
        "src/lib/auth/**/*.ts",
        "src/lib/permissions/**/*.ts",
      ],
      exclude: [
        "**/*.types.ts",
        "**/*.constants.ts",
        "**/*.d.ts",
        "**/__tests__/**",
        "src/components/**",
        "src/app/**",
        // Actions and schemas are thin orchestration wrappers — covered by E2E tests
        "**/*.actions.ts",
        "**/*.schemas.ts",
      ],
      thresholds: {
        statements: 35,
        branches: 60,
        functions: 50,
        lines: 35,
      },
    },

    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "node",
          include: [
            "src/**/*.unit.test.ts",
            "tests/**/*.unit.test.ts",
          ],
          exclude: [
            "node_modules/**",
            "e2e/**",
          ],
          clearMocks: true,
          restoreMocks: true,
          mockReset: true,
        },
      },

      {
        extends: true,
        test: {
          name: "integration",
          environment: "node",
          include: [
            "src/**/*.integration.test.ts",
            "tests/**/*.integration.test.ts",
          ],
          exclude: [
            "node_modules/**",
            "e2e/**",
          ],
          globalSetup: ["./tests/global-setup.ts"],
          setupFiles: ["./tests/setup.ts"],
          testTimeout: 30000,
          hookTimeout: 60000,
        },
      },
    ],
  },
});
