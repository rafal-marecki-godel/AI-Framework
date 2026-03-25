// path: src/pages/WidgetsPage.ts
import { type Page } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Widgets page object model.
 */
export class WidgetsPage extends BaseCategoryPage {
  /**
   * Creates an instance of WidgetsPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
  }
}
