// path: src/fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { AlertsAndWindowsPage, ElementsPage, FormsPage, HomePage, InteractionsPage, LoginPage, ProfilePage, WidgetsPage } from '@pages';
import { UrlConfig } from '@config/environment.config';
import { Logger } from '@utils/logger';

/**
 * Shared test fixture context.
 */
export type BaseFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  profilePage: ProfilePage;
  alertsAndWindowsPage: AlertsAndWindowsPage;
  elementsPage: ElementsPage;
  formsPage: FormsPage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
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
    profilePage: async ({ page }, use) => {
      await use(new ProfilePage(page, UrlConfig.profile));
    },
    alertsAndWindowsPage: async ({ page }, use) => {
      await use(new AlertsAndWindowsPage(page, UrlConfig.alertsWindows));
    },
    elementsPage: async ({ page }, use) => {
      await use(new ElementsPage(page, UrlConfig.elements));
    },
    formsPage: async ({ page }, use) => {
      await use(new FormsPage(page, UrlConfig.forms));
    },
    widgetsPage: async ({ page }, use) => {
      await use(new WidgetsPage(page, UrlConfig.widgets));
    },
    interactionsPage: async ({ page }, use) => {
      await use(new InteractionsPage(page, UrlConfig.interactions));
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
