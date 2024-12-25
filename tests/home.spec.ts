import { expect, test, type Page } from '@playwright/test';

function locateToggleDarkModeBtn(page: Page) {
  return page.locator(`button[aria-label="Toggle dark mode"]`);
}

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
  });

  test('has dark mode toggle button working', async ({ page }) => {
    const toggleBtn = locateToggleDarkModeBtn(page);
    const doc = page.locator('html');

    await expect(toggleBtn).toBeVisible();
    await expect(doc).not.toHaveClass('dark');

    await toggleBtn.click();
    await expect(doc).toHaveClass('dark');
  });

  test('Save theme preference across page reloads', async ({ page }) => {
    const toggleBtn = locateToggleDarkModeBtn(page);
    const doc = page.locator('html');

    await expect(toggleBtn).toBeVisible();
    await expect(doc).not.toHaveClass('dark');

    await toggleBtn.click();
    await expect(doc).toHaveClass('dark');

    await page.reload();
    await expect(doc).toHaveClass('dark');
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
    const searchInput = page.getByLabel('Search');
    const countries = page.locator('ul#countries > li');

    await searchInput.fill('Vietnam');
    await expect(countries).toHaveCount(1);
  });

  test('should be able to filter by continent', async ({ page }) => {
    page.goto('/?size=300');

    const countries = page.locator('ul#countries > li');
    await expect(countries).toHaveCount(250);

    const dropdown = page.getByText('Filter by Region');
    await dropdown.click();

    const europeOption = page.getByText('Oceania', { exact: true });
    await europeOption.click();

    await expect(countries).toHaveCount(27);
  });
});
