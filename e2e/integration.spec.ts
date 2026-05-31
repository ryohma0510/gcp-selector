import { test, expect } from './fixtures';

test.describe('Cross-page integration', () => {
  test('I-1: project added in Options appears in Popup dropdown', async ({
    context,
    popupUrl,
    optionUrl,
  }) => {
    // Add a project on the Option page
    const optionPage = await context.newPage();
    await optionPage.goto(optionUrl);
    await optionPage.fill('.project-input', 'option-added-project');
    await optionPage.click('.add-button');
    await expect(
      optionPage.locator('.project-item').filter({ hasText: 'option-added-project' })
    ).toBeVisible();
    await optionPage.close();

    // Open Popup and verify the project appears in the dropdown
    const popupPage = await context.newPage();
    await popupPage.goto(popupUrl);
    await popupPage.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    await popupPage.locator('.input-section').click();
    await expect(
      popupPage.locator('[class*="option"]').filter({ hasText: 'option-added-project' })
    ).toBeVisible();
  });

  test('I-2: project deleted in Options disappears from Popup dropdown', async ({
    context,
    popupUrl,
    optionUrl,
    seedProjects,
  }) => {
    await seedProjects(['project-keep', 'project-remove']);

    // Delete a project on the Option page
    const optionPage = await context.newPage();
    await optionPage.goto(optionUrl);
    await optionPage
      .locator('.project-item')
      .filter({ hasText: 'project-remove' })
      .locator('.delete-button')
      .click();
    await expect(
      optionPage.locator('.project-item').filter({ hasText: 'project-remove' })
    ).not.toBeVisible();
    await optionPage.close();

    // Open Popup and verify the deleted project is gone
    const popupPage = await context.newPage();
    await popupPage.goto(popupUrl);
    await popupPage.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    await popupPage.locator('.input-section').click();
    await expect(
      popupPage.locator('[class*="option"]').filter({ hasText: 'project-remove' })
    ).not.toBeVisible();
    await expect(
      popupPage.locator('[class*="option"]').filter({ hasText: 'project-keep' })
    ).toBeVisible();
  });

  test('I-3: full setup flow: Popup Settings → add project in Options → reflected in Popup', async ({
    context,
    popupUrl,
    extensionId,
  }) => {
    // 1. Open Popup with no projects registered
    const popupPage = await context.newPage();
    await popupPage.goto(popupUrl);
    await expect(popupPage.locator('.no-projects-message')).toBeVisible();

    // 2. Open Options page via Settings button
    const newPagePromise = context.waitForEvent('page');
    await popupPage.locator('.settings-button').click();
    const optionPage = await newPagePromise;
    expect(optionPage.url()).toContain(`chrome-extension://${extensionId}`);

    // 3. Add a project on the Options page
    await optionPage.fill('.project-input', 'flow-test-project');
    await optionPage.click('.add-button');
    await expect(
      optionPage.locator('.project-item').filter({ hasText: 'flow-test-project' })
    ).toBeVisible();

    // 4. Reopen Popup and verify the project appears in the dropdown
    const popupPage2 = await context.newPage();
    await popupPage2.goto(popupUrl);
    await popupPage2.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    await popupPage2.locator('.input-section').click();
    await expect(
      popupPage2.locator('[class*="option"]').filter({ hasText: 'flow-test-project' })
    ).toBeVisible();
  });
});
