import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  // Extensions require headless: false
  use: {
    headless: false,
  },
  // Build the extension before running tests
  webServer: undefined,
});
