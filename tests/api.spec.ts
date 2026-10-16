import { test, expect } from '@playwright/test';

/**
 * Contoh API testing dengan Playwright — tanpa browser sama sekali.
 * Playwright punya `request` fixture bawaan untuk memanggil REST API
 * langsung (GET/POST/PUT/DELETE) dan assert terhadap status code + body JSON.
 *
 * Di sini memakai JSONPlaceholder (https://jsonplaceholder.typicode.com),
 * REST API publik gratis yang umum dipakai untuk latihan/testing.
 */
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API testing - JSONPlaceholder', () => {
  test('GET /posts/1 mengembalikan satu post dengan field yang benar', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts/1`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('userId');
  });

  test('GET /posts mengembalikan daftar post berupa array', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST /posts membuat resource baru', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/posts`, {
      data: {
        title: 'Judul test dari Playwright',
        body: 'Isi post untuk keperluan testing otomatis.',
        userId: 1,
      },
    });

    // JSONPlaceholder adalah fake API: ia menerima POST dan membalas 201
    // seolah-olah resource dibuat, tapi tidak benar-benar menyimpannya.
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Judul test dari Playwright');
  });

  test('GET ke endpoint yang tidak ada mengembalikan 404', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts/999999`);

    expect(response.status()).toBe(404);
  });
});
