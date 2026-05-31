import { test, expect } from './fixtures';

test.describe('Option ページ', () => {
  test('O-1: プロジェクトを追加すると一覧に表示される', async ({
    context,
    optionUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(optionUrl);

    await page.fill('.project-input', 'new-project-123');
    await page.click('.add-button');

    await expect(
      page.locator('.project-item').filter({ hasText: 'new-project-123' })
    ).toBeVisible();
  });

  test('O-2: 追加したプロジェクトはリロード後も残る', async ({
    context,
    optionUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(optionUrl);

    await page.fill('.project-input', 'persistent-project');
    await page.click('.add-button');
    await page.reload();

    await expect(
      page.locator('.project-item').filter({ hasText: 'persistent-project' })
    ).toBeVisible();
  });

  test('O-3: 空の Project ID で追加するとエラーメッセージが表示される', async ({
    context,
    optionUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(optionUrl);

    await page.click('.add-button');

    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText(
      'Please enter a Project ID'
    );
  });

  test('O-4: プロジェクトを削除すると一覧から消える', async ({
    context,
    optionUrl,
    seedProjects,
  }) => {
    await seedProjects(['project-to-delete', 'project-to-keep']);
    const page = await context.newPage();
    await page.goto(optionUrl);

    await page
      .locator('.project-item')
      .filter({ hasText: 'project-to-delete' })
      .locator('.delete-button')
      .click();

    await expect(
      page.locator('.project-item').filter({ hasText: 'project-to-delete' })
    ).not.toBeVisible();
    await expect(
      page.locator('.project-item').filter({ hasText: 'project-to-keep' })
    ).toBeVisible();
  });

  test('O-5: Enter キーでプロジェクトを追加できる', async ({
    context,
    optionUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(optionUrl);

    await page.fill('.project-input', 'enter-key-project');
    await page.keyboard.press('Enter');

    await expect(
      page.locator('.project-item').filter({ hasText: 'enter-key-project' })
    ).toBeVisible();
  });
});
