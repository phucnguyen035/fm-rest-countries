import test, { expect } from '@playwright/test';

test.describe('Detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/country/vn');
  });

  test('should display country page with correct information', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Vietnam', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Native Names' })).toContainText('Việt Nam');

    const population = await page.getByRole('heading', { name: 'Population' }).innerText();
    const populationNumber = parseInt(population.replaceAll(',', '').split(' ')[1]);
    expect(populationNumber).toBeGreaterThan(90_000_000);

    await expect(page.getByRole('heading', { name: /^Region/ })).toContainText('Asia');
    await expect(page.getByRole('heading', { name: 'Sub region' })).toContainText(
      'South-Eastern Asia',
    );
    await expect(page.getByRole('heading', { name: 'Languages' })).toContainText('Vietnamese');
    await expect(page.getByRole('heading', { name: 'Capital' })).toContainText('Hanoi');
    await expect(page.getByRole('heading', { name: 'Top level domain' })).toContainText('.vn');
    await expect(page.getByRole('heading', { name: 'Currency' })).toContainText('Vietnamese đồng');
    await expect(
      page
        .getByRole('region', { name: 'Border countries' })
        .getByRole('list')
        .getByRole('listitem'),
    ).toHaveCount(3);
  });

  test('should navigate to a neighboring country ', async ({ page }) => {
    await page.getByRole('link', { name: 'China' }).click();
    await expect(page.getByRole('heading', { name: 'China', exact: true })).toBeVisible();
  });
});
