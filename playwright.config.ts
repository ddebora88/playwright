import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi utama Playwright Test.
 * Dokumentasi lengkap: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Folder tempat semua file test (*.spec.ts) berada.
  testDir: './tests',

  // Jalankan file test secara paralel satu sama lain.
  fullyParallel: true,

  // Gagalkan build CI jika ada test.only yang tidak sengaja ketinggalan di source.
  forbidOnly: !!process.env.CI,

  // Retry otomatis hanya di CI (lingkungan lokal biasanya lebih stabil / lebih mudah di-debug manual).
  retries: process.env.CI ? 2 : 0,

  // Nonaktifkan paralel worker di CI standar (gunakan 1) supaya hasil lebih deterministik;
  // di lokal, pakai default (otomatis menyesuaikan jumlah core).
  workers: process.env.CI ? 1 : undefined,

  // Reporter: "html" menghasilkan laporan interaktif (buka dengan `npx playwright show-report`),
  // "list" menampilkan progres ringkas di terminal.
  reporter: [['html', { open: 'never' }], ['list']],

  // Pengaturan yang dipakai bersama oleh semua project di bawah.
  use: {
    // Base URL supaya di dalam test bisa pakai page.goto('/') alih-alih URL penuh.
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev/todomvc',

    // Simpan trace hanya saat retry pertama gagal — berguna untuk debug tanpa membebani disk setiap run.
    trace: 'on-first-retry',

    // Screenshot hanya diambil ketika test gagal.
    screenshot: 'only-on-failure',

    // Rekam video hanya untuk test yang gagal lalu di-retry.
    video: 'retain-on-failure',
  },

  // Daftar browser/perangkat yang dijalankan. Secara default repo ini men-generate
  // untuk 3 browser utama. Di sandbox/CI yang hanya punya Chromium terpasang,
  // jalankan dengan: npx playwright test --project=chromium
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
