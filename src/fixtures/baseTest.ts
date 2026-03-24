// path: src/fixtures/baseTest.ts
import { test as base, type BrowserContext, type Page } from '@playwright/test';
import { Logger } from '@utils/logger';

/**
 * Shared test fixture context.
 */
export type BaseFixtures = {
  context: BrowserContext;
  page: Page;
};

/**
 * Base test with setup and teardown hooks.
 */
export class BaseTest {
  public static readonly test = base.extend<BaseFixtures>({});

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
