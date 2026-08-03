import { test, expect } from '@playwright/test';

test.describe('Authenticated Administrator Operations', () => {
  test('Super Administrator creates a new branch and edits it', async ({ page }) => {
    const uniqueSuffix = Date.now().toString().slice(-6);
    const branchCode = `E2E-${uniqueSuffix}`;
    const branchName = `Playwright E2E Campus ${uniqueSuffix}`;
    const branchSlug = `playwright-e2e-${uniqueSuffix}`;

    // 1. Visit Branches list
    await page.goto('/admin/branches');
    await expect(page.locator('h1')).toContainText('Branch Locations');

    // 2. Click "Add Branch"
    await page.getByRole('link', { name: 'Add Branch' }).click();
    await page.waitForURL('**/admin/branches/new');

    // 3. Fill Branch Form
    await page.locator('#branchCode').fill(branchCode);
    await page.locator('#branchName').fill(branchName);
    await page.locator('#slug').fill(branchSlug);
    await page.locator('#addressLine1').fill('Plot 400 E2E Lane');
    await page.locator('#city').fill('Hyderabad');
    await page.locator('#state').fill('Telangana');
    await page.locator('#postalCode').fill('500081');
    await page.locator('#phone').fill('+91 91111 22222');
    await page.locator('#email').fill('e2e-campus@test.com');

    // 4. Click Save & Close
    await page.getByRole('button', { name: 'Save & Close' }).click();

    // 5. Verify redirect to list and check if item is in the table
    await page.waitForURL('**/admin/branches', { timeout: 15000 });
    await expect(page.locator('table')).toContainText(branchCode);
    await expect(page.locator('table')).toContainText(branchName);

    // 6. Click Edit on the newly created branch
    await page.locator(`tr:has-text("${branchCode}")`).getByRole('link', { name: /edit/i }).first().click();
    await expect(page.locator('h1')).toContainText('Edit Branch');

    // 7. Update Name
    const updatedName = `${branchName} Updated`;
    await page.locator('#branchName').fill(updatedName);
    await page.getByRole('button', { name: 'Save & Close' }).click();

    // 8. Verify name update in table
    await page.waitForURL('**/admin/branches', { timeout: 15000 });
    await expect(page.locator('table')).toContainText(updatedName);
  });

  test('Super Administrator creates a classroom and handles duplicate validation error', async ({ page }) => {
    const uniqueSuffix = Date.now().toString().slice(-6);
    const classroomCode = `CR-${uniqueSuffix}`;

    // 1. Visit Classrooms list
    await page.goto('/admin/classrooms');
    await expect(page.locator('h1')).toContainText('Classroom Hub');

    // 2. Click "Add Classroom"
    await page.getByRole('link', { name: 'Add Classroom' }).click();
    await page.waitForURL('**/admin/classrooms/new');

    // 3. Fill Classroom Form — select the baseline TEST-HQ branch first
    await page.locator('#branchId').selectOption({ label: 'Test Head Office HQ (TEST-HQ)' });
    await page.locator('#classroomCode').fill(classroomCode);
    await page.locator('#classroomName').fill('Playwright Room A');
    await page.locator('#capacity').fill('45');
    await page.locator('#floor').fill('2');

    // 4. Save & Close
    await page.getByRole('button', { name: 'Save & Close' }).click();

    // 5. Verify created successfully in table
    await page.waitForURL('**/admin/classrooms', { timeout: 15000 });
    await expect(page.locator('table')).toContainText(classroomCode);
    await expect(page.locator('table')).toContainText('Playwright Room A');

    // 6. Attempt creating a classroom with duplicate code under the same branch
    await page.getByRole('link', { name: 'Add Classroom' }).click();
    await page.waitForURL('**/admin/classrooms/new');

    await page.locator('#branchId').selectOption({ label: 'Test Head Office HQ (TEST-HQ)' });
    await page.locator('#classroomCode').fill(classroomCode); // Duplicate code
    await page.locator('#classroomName').fill('Another duplicate room');
    await page.locator('#capacity').fill('15');

    // Submit
    await page.getByRole('button', { name: 'Save & Close' }).click();

    // Verify duplicate validation alert is visible
    // The actual error from ClassroomService: "Classroom code '...' already exists within branch..."
    await expect(page.locator('form')).toContainText('already exists within branch');
  });
});
