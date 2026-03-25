// path: src/pages/InteractionsPage.ts
import { type Page } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Interactions page object model.
 */
export class InteractionsPage extends BaseCategoryPage {
  /**
   * Creates an instance of InteractionsPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
  }
}
