import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/super-admin.json';

setup('authenticate as Super Admin', async ({ page }) => {
  // Go to Admin Login Page
  await page.goto('/admin/login');

  // Input Credentials
  await page.locator('input[type="email"]').fill('admin@example.test');
  await page.locator('input[type="password"]').fill('TestPassword123!');

  // Submit form
  await page.locator('button[type="submit"]').click();

  // Wait to reach dashboard home
  await page.waitForURL('**/admin/dashboard');
  
  // Verify user is on the dashboard page
  await expect(page.locator('h1')).toContainText('Welcome back');

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
