import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
  });

  test('has dark mode toggle button working', async ({ page }) => {
    const toggleBtn = page.locator(`button[aria-labelledby="dark-mode"]`);
    const app = page.locator('#app');

    await expect(toggleBtn).toBeVisible();
    await expect(app).toHaveClass('light');

    await toggleBtn.click();
    await expect(app).toHaveClass('dark');
  });

  test('Save theme preference across page reloads', async ({ page }) => {
    const toggleBtn = page.locator(`button[aria-labelledby="dark-mode"]`);
    const app = page.locator('#app');

    await expect(toggleBtn).toBeVisible();
    await expect(app).toHaveClass('light');

    await toggleBtn.click();
    await expect(app).toHaveClass('dark');

    await page.reload();
    await expect(app).toHaveClass('dark');
  });

  test('has list of 20 countries initially', async ({ page }) => {
    const AMOUNT_OF_COUNTRIES = 20;
    const countries = page.locator('ul#countries > li');

    await expect(countries).toHaveCount(AMOUNT_OF_COUNTRIES);
  });

  test('should extend the list when scrolling to bottom', async ({ page }) => {
    await page.locator('button:has-text("Load more")').scrollIntoViewIfNeeded();

    const AMOUNT_OF_COUNTRIES = 40;
    const countries = page.locator('ul#countries > li');

    await expect(countries).toHaveCount(AMOUNT_OF_COUNTRIES);
  });

  test('should be able to search', async ({ page }) => {
    const AMOUNT_OF_COUNTRIES = 1;
    const searchInput = page.locator('input#search');
    const countries = page.locator('ul#countries > li');

    await searchInput.fill('United States of America');
    await expect(countries).toHaveCount(AMOUNT_OF_COUNTRIES);
  });
});
