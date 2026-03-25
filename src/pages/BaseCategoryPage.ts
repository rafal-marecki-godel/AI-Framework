// path: src/pages/BaseCategoryPage.ts
import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Base class for DemoQA category pages that include a header banner.
 */
export abstract class BaseCategoryPage extends BasePage {
  public readonly header: HeaderComponent;

  /**
   * Creates an instance of BaseCategoryPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  protected constructor(page: Page, url: string) {
    super(page, url);
    this.header = new HeaderComponent(page, page.getByRole('banner'));
  }

  /**
   * Returns the advertisement iframe by accessible label.
   */
  get advertisementElement(): Locator {
    return this.page.getByLabel('Advertisement').first();
  }
}
