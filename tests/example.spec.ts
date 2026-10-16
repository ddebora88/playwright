import { test, expect } from '@playwright/test';

/**
 * Test paling dasar — tanpa Page Object, tanpa fixture custom.
 * Tujuannya menunjukkan anatomi minimal sebuah test Playwright:
 * goto -> aksi -> assertion.
 */
test.describe('Smoke test dasar', () => {
  test('halaman TodoMVC terbuka dengan judul yang benar', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/TodoMVC/i);
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  });

  test('bisa navigasi ke playwright.dev dan menemukan heading utama', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page.getByRole('heading', { name: /Playwright enables reliable/i })).toBeVisible();
  });
});
