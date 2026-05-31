import { test, expect } from './fixtures';

test.describe('ページ間連携', () => {
  test('I-1: Option で追加したプロジェクトが Popup の選択肢に表示される', async ({
    context,
    popupUrl,
    optionUrl,
  }) => {
    // Option ページでプロジェクトを追加
    const optionPage = await context.newPage();
    await optionPage.goto(optionUrl);
    await optionPage.fill('.project-input', 'option-added-project');
    await optionPage.click('.add-button');
    await expect(
      optionPage.locator('.project-item').filter({ hasText: 'option-added-project' })
    ).toBeVisible();
    await optionPage.close();

    // Popup を開いてドロップダウンに表示されることを確認
    const popupPage = await context.newPage();
    await popupPage.goto(popupUrl);
    await popupPage.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    await popupPage.locator('.input-section').click();
    await expect(
      popupPage.locator('[class*="option"]').filter({ hasText: 'option-added-project' })
    ).toBeVisible();
  });

  test('I-2: Option で削除したプロジェクトが Popup の選択肢から消える', async ({
    context,
    popupUrl,
    optionUrl,
    seedProjects,
  }) => {
    await seedProjects(['project-keep', 'project-remove']);

    // Option ページで削除
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

    // Popup を開いて削除されたプロジェクトが表示されないことを確認
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

  test('I-3: 初回セットアップフロー: Popup Settings → Option でプロジェクト追加 → Popup に反映', async ({
    context,
    popupUrl,
    extensionId,
  }) => {
    // 1. Popup を開く（プロジェクト未登録）
    const popupPage = await context.newPage();
    await popupPage.goto(popupUrl);
    await expect(popupPage.locator('.no-projects-message')).toBeVisible();

    // 2. Settings ボタンで Option ページを開く
    const newPagePromise = context.waitForEvent('page');
    await popupPage.locator('.settings-button').click();
    const optionPage = await newPagePromise;
    expect(optionPage.url()).toContain(`chrome-extension://${extensionId}`);

    // 3. Option ページでプロジェクトを追加
    await optionPage.fill('.project-input', 'flow-test-project');
    await optionPage.click('.add-button');
    await expect(
      optionPage.locator('.project-item').filter({ hasText: 'flow-test-project' })
    ).toBeVisible();

    // 4. Popup を再度開いてプロジェクトが選択肢に表示されることを確認
    const popupPage2 = await context.newPage();
    await popupPage2.goto(popupUrl);
    await popupPage2.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    await popupPage2.locator('.input-section').click();
    await expect(
      popupPage2.locator('[class*="option"]').filter({ hasText: 'flow-test-project' })
    ).toBeVisible();
  });
});
