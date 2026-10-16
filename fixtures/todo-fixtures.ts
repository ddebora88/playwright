import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

/**
 * Custom fixture: meng-extend `test` bawaan Playwright supaya setiap test
 * otomatis punya `todoPage` yang sudah ter-navigasi ke halaman TodoMVC,
 * tanpa perlu menulis `new TodoPage(page)` + `goto()` berulang-ulang
 * di setiap file spec.
 *
 * Pakai dengan: import { test, expect } from '../fixtures/todo-fixtures';
 */
type TodoFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    // "use" menyerahkan instance ke dalam body test; kode setelah `await use(...)`
    // (kalau ada) akan jalan sebagai teardown setelah test selesai.
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
