// path: src/pages/FormsPage.ts
import { type Page } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Forms page object model.
 */
export class FormsPage extends BaseCategoryPage {
  /**
   * Creates an instance of FormsPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
  }
}
