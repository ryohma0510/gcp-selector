import { test, expect } from './fixtures';

const TEST_PROJECTS = ['test-project-alpha', 'test-project-beta'];

test.describe('Popup - no projects registered', () => {
  test('P-2: shows NoProjectsMessage without focus errors', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForTimeout(1000);

    await expect(page.locator('.no-projects-message')).toBeVisible();
  });
});

test.describe('Popup - with projects', () => {
  test.beforeEach(async ({ seedProjects }) => {
    await seedProjects(TEST_PROJECTS);
  });

  test('P-1: project input is auto-focused on open', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag).toBe('INPUT');
  });

  test('P-3: focus moves to service input after project selection', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    // Open dropdown with ArrowDown and confirm with Enter
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Wait for RAF-based focus transition
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );

    const isServiceFocused = await page.evaluate(
      () => !!document.activeElement?.closest('.service-section')
    );
    expect(isServiceFocused).toBe(true);
  });

  test('P-4: selecting project and service opens a new tab', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const newPagePromise = context.waitForEvent('page');

    // Select project
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );

    // Select service
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const newPage = await newPagePromise;
    expect(newPage.url()).toBeTruthy();
  });

  test('P-5: opened tab URL contains the project ID', async ({
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
    // Check decoded URL to handle Google sign-in redirect
    const decodedUrl = decodeURIComponent(newPage.url());
    expect(decodedUrl).toContain(`project=${TEST_PROJECTS[0]}`);
  });

  test('P-6: popup can be completed with keyboard only', async ({
    context,
    popupUrl,
  }) => {
    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForFunction(() => document.activeElement?.tagName === 'INPUT');

    const newPagePromise = context.waitForEvent('page');

    // Project: ArrowDown → Enter
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () => !!document.activeElement?.closest('.service-section')
    );

    // Service: ArrowDown → Enter
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const newPage = await newPagePromise;
    const decodedUrl = decodeURIComponent(newPage.url());
    expect(decodedUrl).toContain('console.cloud.google.com');
    expect(decodedUrl).toContain('project=');
  });

  test('P-7: settings button opens the options page', async ({
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
