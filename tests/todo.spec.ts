import { test, expect } from '../fixtures/todo-fixtures';

/**
 * Test UI yang lebih lengkap memakai Page Object Model (lihat pages/todo-page.ts)
 * lewat custom fixture `todoPage` (lihat fixtures/todo-fixtures.ts).
 *
 * Setiap test di sini mendapat `todoPage` yang sudah otomatis ter-navigasi
 * ke halaman, jadi body test fokus ke skenario, bukan boilerplate setup.
 */
test.describe('TodoMVC - operasi dasar', () => {
  test('menambahkan satu todo baru', async ({ todoPage }) => {
    await todoPage.addTodo('Beli bahan rendang');

    await todoPage.expectItemCount(1);
    await expect(todoPage.getTodoItem('Beli bahan rendang')).toBeVisible();
  });

  test('menambahkan beberapa todo sekaligus', async ({ todoPage }) => {
    await todoPage.addTodos(['Review PR', 'Deploy ke staging', 'Update changelog']);

    await todoPage.expectItemCount(3);
  });

  test('menandai todo sebagai selesai', async ({ todoPage }) => {
    await todoPage.addTodo('Tulis unit test');
    await todoPage.completeTodo('Tulis unit test');

    await expect(todoPage.getTodoItem('Tulis unit test')).toHaveClass(/completed/);
  });

  test('menghapus todo', async ({ todoPage }) => {
    await todoPage.addTodo('Todo yang akan dihapus');
    await todoPage.expectItemCount(1);

    await todoPage.deleteTodo('Todo yang akan dihapus');

    await todoPage.expectItemCount(0);
  });

  test('mengedit teks todo yang sudah ada', async ({ todoPage }) => {
    await todoPage.addTodo('Judul lama');
    await todoPage.editTodo('Judul lama', 'Judul baru');

    await expect(todoPage.getTodoItem('Judul baru')).toBeVisible();
    await expect(todoPage.getTodoItem('Judul lama')).toHaveCount(0);
  });
});

test.describe('TodoMVC - filter', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addTodos(['Task A', 'Task B', 'Task C']);
    await todoPage.completeTodo('Task B');
  });

  test('filter "Active" hanya menampilkan todo yang belum selesai', async ({ todoPage }) => {
    await todoPage.filterActive.click();

    await todoPage.expectItemCount(2);
    await expect(todoPage.getTodoItem('Task B')).toHaveCount(0);
  });

  test('filter "Completed" hanya menampilkan todo yang sudah selesai', async ({ todoPage }) => {
    await todoPage.filterCompleted.click();

    await todoPage.expectItemCount(1);
    await expect(todoPage.getTodoItem('Task B')).toBeVisible();
  });

  test('"Clear completed" menghapus semua todo yang sudah selesai', async ({ todoPage }) => {
    await todoPage.clearCompletedButton.click();

    await todoPage.expectItemCount(2);
  });
});
