import { test, expect } from './fixtures';

const TEST_PROJECTS = ['test-project-alpha', 'test-project-beta'];

test.describe('Popup - プロジェクト未登録', () => {
  test('P-2: NoProjectsMessage が表示されフォーカスエラーが起きない', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForTimeout(1000);

    await expect(page.locator('.no-projects-message')).toBeVisible();
  });
});

test.describe('Popup - プロジェクトあり', () => {
  test.beforeEach(async ({ seedProjects }) => {
    await seedProjects(TEST_PROJECTS);
  });

  test('P-1: ポップアップを開くとプロジェクト入力欄に自動フォーカスされる', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag).toBe('INPUT');
  });

  test('P-3: プロジェクト選択後にサービス入力欄へフォーカスが移る', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    // プロジェクトを選択（ArrowDown でドロップダウンを開き Enter で確定）
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // RAF によるフォーカス移動を待機
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );

    const isServiceFocused = await page.evaluate(
      () => !!document.activeElement?.closest('.service-section')
    );
    expect(isServiceFocused).toBe(true);
  });

  test('P-4: プロジェクト＋サービス選択で新しいタブが開く', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const newPagePromise = context.waitForEvent('page');

    // プロジェクト選択
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );

    // サービス選択
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const newPage = await newPagePromise;
    expect(newPage.url()).toBeTruthy();
  });

  test('P-5: 開いたタブの URL にプロジェクト ID が含まれる', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const newPagePromise = context.waitForEvent('page');

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const newPage = await newPagePromise;
    // リダイレクト先でもデコードしたURLにプロジェクト ID が含まれること
    const decodedUrl = decodeURIComponent(newPage.url());
    expect(decodedUrl).toContain(`project=${TEST_PROJECTS[0]}`);
  });

  test('P-6: キーボードのみでポップアップを操作して GCP を開ける', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const newPagePromise = context.waitForEvent('page');

    // プロジェクト: 矢印キー → Enter
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );

    // サービス: 矢印キー → Enter
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const newPage = await newPagePromise;
    const decodedUrl = decodeURIComponent(newPage.url());
    expect(decodedUrl).toContain('console.cloud.google.com');
    expect(decodedUrl).toContain('project=');
  });

  test('P-7: Settings ボタンでオプションページが開く', async ({
    context,
    popupUrl,
    extensionId,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForTimeout(500);

    const newPagePromise = context.waitForEvent('page');
    await page.locator('.settings-button').click();

    const newPage = await newPagePromise;
    expect(newPage.url()).toContain(`chrome-extension://${extensionId}`);
    expect(newPage.url()).toContain('option');
  });
});
