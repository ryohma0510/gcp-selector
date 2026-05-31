import { test, expect } from './fixtures';

// Must match src/utils/projects/Constant.ts
const STORAGE_KEY_PROJECT_IDS = 'storageKeyProjectIDs';
const TEST_PROJECTS = ['test-project-alpha', 'test-project-beta'];

test.describe('Popup', () => {
  test('project input is focused on open when projects exist', async ({
    context,
    extensionId,
  }) => {
    const popupUrl = `chrome-extension://${extensionId}/popup/popup.html`;

    // Seed storage with test projects
    const setupPage = await context.newPage();
    await setupPage.goto(popupUrl);
    await setupPage.evaluate(
      ({ key, projects }) => chrome.storage.local.set({ [key]: projects }),
      { key: STORAGE_KEY_PROJECT_IDS, projects: TEST_PROJECTS }
    );
    await setupPage.close();

    // Open popup and verify focus
    const page = await context.newPage();
    await page.goto(popupUrl);
    // Wait for chrome.storage async load + requestAnimationFrame
    await page.waitForTimeout(1000);

    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag).toBe('INPUT');
  });

  test('no focus error when no projects are registered', async ({
    context,
    extensionId,
  }) => {
    const popupUrl = `chrome-extension://${extensionId}/popup/popup.html`;

    const page = await context.newPage();
    await page.goto(popupUrl);
    await page.waitForTimeout(1000);

    // Should show no-projects message without errors
    await expect(page.locator('.no-projects-message')).toBeVisible();
  });
});
