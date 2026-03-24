// path: src/pages/HomePage.ts
import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Home page object model.
 */
export class HomePage extends BasePage {
  public readonly header: HeaderComponent;

  /**
   * Creates an instance of HomePage.
   * @param page Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  /**
   * Opens the home page route.
   */
  public async open(): Promise<void> {
    await this.navigate('/');
  }

  /**
   * Searches by keyword using the global search field.
   * @param keyword Search text.
   */
  public async search(keyword: string): Promise<void> {
    await this.getByLabel('Search').fill(keyword);
    await this.getByRole('button', 'Search').click();
  }

  /**
   * Asserts that the page heading is visible.
   */
  public async expectHeadingVisible(): Promise<void> {
    await expect(this.getByRole('heading', 'Home')).toBeVisible();
  }
}
