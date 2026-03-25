// path: src/pages/ElementsPage.ts
import { type Page } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Elements page object model.
 */
export class ElementsPage extends BaseCategoryPage {
  /**
   * Creates an instance of ElementsPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
  }
}
