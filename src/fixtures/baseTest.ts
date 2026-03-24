// path: src/fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { LoginPage } from '@pages/LoginPage';
import { UrlConfig } from '@config/environment.config';
import { Logger } from '@utils/logger';

/**
 * Shared test fixture context.
 */
export type BaseFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

/**
 * Base test with setup and teardown hooks.
 */
export class BaseTest {
  public static readonly test = base.extend<BaseFixtures>({
    homePage: async ({ page }, use) => {
      await use(new HomePage(page, UrlConfig.home));
    },
    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page, UrlConfig.login));
    },
  });

  /**
   * Registers common setup and teardown hooks.
   */
  public static registerHooks(): void {
    BaseTest.test.beforeEach(async ({}, testInfo) => {
      Logger.info(`Starting test: ${testInfo.title}`);
    });

    BaseTest.test.afterEach(async ({}, testInfo) => {
      Logger.info(`Finished test: ${testInfo.title} with status: ${testInfo.status}`);
    });
  }
}

BaseTest.registerHooks();

export const test = BaseTest.test;

export { expect } from '@playwright/test';
