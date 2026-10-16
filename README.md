# Playwright Sample Project

Project contoh untuk automation testing memakai [Playwright Test](https://playwright.dev/), ditulis dengan TypeScript. Mencakup:

- **UI testing** dengan [Page Object Model](https://playwright.dev/docs/pom) (`pages/todo-page.ts`) terhadap [TodoMVC demo resmi Playwright](https://demo.playwright.dev/todomvc).
- **Custom fixture** (`fixtures/todo-fixtures.ts`) supaya setiap test otomatis dapat halaman yang sudah siap pakai.
- **API testing** (`tests/api.spec.ts`) tanpa browser sama sekali, memakai `request` fixture bawaan Playwright.
- **CI** otomatis lewat GitHub Actions (`.github/workflows/playwright.yml`) yang jalan di setiap push/PR.

## Struktur folder

```
.
├── .github/workflows/playwright.yml   # CI: jalankan test di GitHub Actions
├── fixtures/
│   └── todo-fixtures.ts               # Custom fixture (extend `test` bawaan)
├── pages/
│   └── todo-page.ts                   # Page Object Model untuk TodoMVC
├── tests/
│   ├── example.spec.ts                # Test paling dasar (tanpa POM)
│   ├── todo.spec.ts                   # Test UI lengkap, pakai POM + fixture
│   └── api.spec.ts                    # Test API (tanpa browser)
├── playwright.config.ts               # Konfigurasi utama
├── tsconfig.json
└── package.json
```

## Instalasi

Butuh [Node.js](https://nodejs.org/) versi 18 ke atas.

```bash
npm install
npx playwright install        # download browser Chromium, Firefox, WebKit
```

> Kalau cuma mau pakai Chromium (lebih cepat, lebih ringan): `npx playwright install chromium`

## Menjalankan test

```bash
npm test                      # jalankan semua test, semua browser (headless)
npm run test:chromium         # hanya di Chromium
npm run test:headed           # buka window browser supaya kelihatan jalan
npm run test:ui               # buka Playwright UI mode (interaktif, best untuk development)
npm run test:debug            # mode debug step-by-step (Playwright Inspector)
npm run test:api              # hanya jalankan test API
```

Setelah run selesai, lihat laporan HTML interaktif:

```bash
npm run report
```

## Menulis test baru

1. Tambahkan file baru di `tests/`, akhiran `.spec.ts`.
2. Kalau test butuh berinteraksi dengan UI yang sama berulang kali, buat/pakai Page Object di `pages/` supaya locator tidak terduplikasi.
3. Kalau test butuh setup yang sama di banyak file, pertimbangkan custom fixture di `fixtures/`.

Contoh generate test otomatis dari rekaman klik browser:

```bash
npm run codegen
```

## CI (GitHub Actions)

Setiap push/PR ke branch `main`/`master` akan otomatis:
1. Install dependencies & browser.
2. Menjalankan seluruh test di 3 browser (Chromium, Firefox, WebKit).
3. Meng-upload laporan HTML sebagai artifact (bisa didownload dari halaman run di tab **Actions**), tersimpan 14 hari.

## Referensi

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Models](https://playwright.dev/docs/pom)
- [API Testing](https://playwright.dev/docs/api-testing)
