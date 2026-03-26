import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Book Store table component model.
 */
export class BookStoreTableComponent extends BaseComponent {
  /**
   * Creates an instance of BookStoreTableComponent.
   * @param page Playwright page object.
   * @param locator Root locator for the table.
   */
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns the table container locator.
   */
  get container(): Locator {
    return this.root;
  }

  /**
   * Returns all table row locators.
   */
  get rows(): Locator {
    return this.root.getByRole('row').filter({ has: this.root.getByRole('link') });
  }

  /**
   * Returns all book title link locators.
   */
  get titleLinks(): Locator {
    return this.root.getByRole('link');
  }

  /**
   * Returns a book title link locator by title.
   * @param title Book title.
   */
  getTitleLinkByTitle(title: string): Locator {
    return this.titleLinks.filter({ hasText: title }).first();
  }

  /**
   * Returns all book titles from the table.
   */
  async getAllBookTitles(): Promise<string[]> {
    const titles = await this.titleLinks.allTextContents();
    return titles.map(title => title.trim()).filter(Boolean);
  }

  /**
   * Clicks a book title link by title.
   * @param title Book title.
   */
  async clickBookByTitle(title: string): Promise<void> {
    await this.getTitleLinkByTitle(title).click();
  }

  /**
   * Checks whether a book with given title exists in the table.
   * @param title Book title.
   */
  async hasBookTitle(title: string): Promise<boolean> {
    return (await this.getTitleLinkByTitle(title).count()) > 0;
  }
}