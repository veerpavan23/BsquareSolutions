import { test, expect } from '@playwright/test';

test.describe('Guest User Redirection Protection', () => {
  test('should redirect guest user attempting to access branches to login page', async ({ page }) => {
    await page.goto('/admin/branches');
    await page.waitForURL('**/admin/login*');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('should redirect guest user attempting to access classrooms to login page', async ({ page }) => {
    await page.goto('/admin/classrooms');
    await page.waitForURL('**/admin/login*');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});
