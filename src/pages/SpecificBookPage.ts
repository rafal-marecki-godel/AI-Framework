import { type Locator, type Page } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Specific book details page object model.
 */
export class SpecificBookPage extends BaseCategoryPage {
  /**
   * Creates an instance of SpecificBookPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
  }

  /**
   * Returns the Add To Your Collection button locator.
   */
  get addToYourCollectionButton(): Locator {
    return this.page.getByRole('button', { name: 'Add To Your Collection' });
  }

  /**
   * Clicks Add To Your Collection and accepts confirmation alert.
   */
  async addToCollection(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToYourCollectionButton.click();
    const dialog = await dialogPromise;
    await dialog.accept();
  }
}