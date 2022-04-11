import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has dark mode toggle button working', async ({ page }) => {
    const toggleBtn = page.locator(`button[aria-labelledby="dark-mode"]`);
    const app = page.locator('#app');

    await expect(toggleBtn).toBeVisible();

    await toggleBtn.click();
    await expect(app).toHaveClass('light');

    await toggleBtn.click();
    await expect(app).toHaveClass('dark');
  });

  test('has list of 20 countries initially', async ({ page }) => {
    const AMOUNT_OF_COUNTRIES = 20;
    const countries = page.locator('ul#countries > li');

    await expect(countries).toHaveCount(AMOUNT_OF_COUNTRIES);
  });
});
