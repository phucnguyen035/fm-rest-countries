import test, { expect } from '@playwright/test';

test.describe('Detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/country/vn');
  });

  test('should display country page with correct information', async ({ page }) => {
    await expect(page.getByRole('heading', { exact: true, name: 'Vietnam' })).toBeVisible();
    await expect(page.getByText('Native Name: Việt Nam')).toBeVisible();

    const population = await page.locator('h3:has-text("Population:") ~ span').innerText();
    const populationNumber = parseInt(population.replaceAll(',', ''));
    expect(populationNumber).toBeGreaterThan(90_000_000);

    await expect(page.getByText('Region: Asia')).toBeVisible();
    await expect(page.getByText('Sub region: South-Eastern Asia')).toBeVisible();
    await expect(page.getByText('Languages: Vietnamese')).toBeVisible();
    await expect(page.getByText('Capital: Hanoi')).toBeVisible();
    await expect(page.getByText('Top level domain: .vn')).toBeVisible();
    await expect(page.getByText('Currency: Vietnamese đồng')).toBeVisible();

    const borderCountriesAmount = 3; // Laos, Cambodia, China
    await expect(page.locator('h2:has-text("Border countries:") ~ ul > li')).toHaveCount(
      borderCountriesAmount,
    );
  });

  test('should navigate to a neighboring country ', async ({ page }) => {
    const locator = page.getByText(/^China$/);
    await locator.click();

    await expect(page.getByRole('heading', { name: 'China', exact: true })).toBeVisible();
  });
});
