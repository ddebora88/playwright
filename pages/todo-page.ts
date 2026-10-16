import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Page Object Model untuk aplikasi TodoMVC (https://demo.playwright.dev/todomvc).
 *
 * Pola Page Object memisahkan "cara berinteraksi dengan halaman" (locator, aksi)
 * dari "apa yang diuji" (assertion di file *.spec.ts), supaya kalau struktur
 * HTML halaman berubah, kita hanya perlu update di satu tempat ini.
 */
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
  }

  /** Buka halaman TodoMVC dari awal. */
  async goto() {
    await this.page.goto('/');
  }

  /** Tambah satu todo baru lewat input field + tekan Enter. */
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /** Tambah beberapa todo sekaligus, berurutan. */
  async addTodos(texts: string[]) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  /** Ambil locator satu todo item berdasarkan teksnya. */
  getTodoItem(text: string): Locator {
    return this.todoItems.filter({ hasText: text });
  }

  /** Tandai satu todo sebagai selesai (checklist) berdasarkan teksnya. */
  async completeTodo(text: string) {
    await this.getTodoItem(text).getByRole('checkbox').check();
  }

  /** Hapus satu todo lewat tombol "x" yang muncul saat item di-hover. */
  async deleteTodo(text: string) {
    const item = this.getTodoItem(text);
    await item.hover();
    await item.getByLabel('Delete').click();
  }

  /** Masuk ke mode edit todo (double click), ganti teks, lalu simpan dengan Enter. */
  async editTodo(oldText: string, newText: string) {
    const item = this.getTodoItem(oldText);
    await item.dblclick();
    const editInput = item.getByRole('textbox', { name: 'Edit' });
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  /** Pastikan jumlah todo yang tersisa (counter kiri bawah) sesuai ekspektasi. */
  async expectItemCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }
}
