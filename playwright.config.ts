// path: playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import { getEnvNumber, getEnvString } from './src/utils/envHelper';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: getEnvNumber('PW_RETRIES', 2),
  workers: getEnvNumber('PW_WORKERS', 3),
  timeout: getEnvNumber('PW_TEST_TIMEOUT_MS', 30_000),
  expect: {
    timeout: getEnvNumber('PW_EXPECT_TIMEOUT_MS', 5_000),
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL: getEnvString('BASE_URL', 'https://demoqa.com'),
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
    headless: getEnvString('PW_HEADLESS', 'true') !== 'false',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
