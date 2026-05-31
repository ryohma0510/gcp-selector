import { test as base, chromium, BrowserContext } from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';

const EXTENSION_PATH = path.join(__dirname, '../dist');

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  // Fresh browser profile per test to avoid state pollution
  context: async ({}, use) => {
    const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'gcp-selector-e2e-'));
    const context = await chromium.launchPersistentContext(tmpProfile, {
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
        '--no-sandbox',
      ],
    });
    await use(context);
    await context.close();
    fs.rmSync(tmpProfile, { recursive: true });
  },

  extensionId: async ({ context }, use) => {
    // Detect extension ID via chrome://extensions
    const page = await context.newPage();
    await page.goto('chrome://extensions');
    await page.waitForTimeout(1000);
    const id = await page.evaluate(() => {
      const items = document.querySelector('extensions-manager')
        ?.shadowRoot?.querySelector('extensions-item-list')
        ?.shadowRoot?.querySelectorAll('extensions-item');
      if (!items) return '';
      for (const item of items) {
        const name = item.shadowRoot?.querySelector('#name')?.textContent ?? '';
        if (name.includes('GCP')) return item.getAttribute('id') ?? '';
      }
      return '';
    });
    await page.close();

    if (!id) throw new Error('GCP Selector extension not found. Run `npm run build` first.');
    await use(id);
  },
});

export { expect } from '@playwright/test';
