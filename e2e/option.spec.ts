import { test, expect } from './fixtures';

test.describe('Option page', () => {
  test('O-1: added project appears in the list', async ({
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

  test('O-2: added project persists after reload', async ({
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

  test('O-3: shows error message when adding an empty project ID', async ({
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

  test('O-4: deleted project disappears from the list', async ({
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

  test('O-5: Enter key adds a project', async ({
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
