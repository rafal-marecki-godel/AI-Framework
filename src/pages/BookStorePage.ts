import { type Locator, type Page } from '@playwright/test';
import { BookStoreTableComponent } from '@components/BookStoreTableComponent';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Book Store page object model.
 */
export class BookStorePage extends BaseCategoryPage {
  public readonly booksTable: BookStoreTableComponent;

  /**
   * Creates an instance of BookStorePage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
    this.booksTable = new BookStoreTableComponent(page, page.getByRole('table').first());
  }

  /**
   * Returns the search input locator.
   */
  get searchBar(): Locator {
    return this.page.locator('#searchBox');
  }

  /**
   * Returns the search button locator.
   */
  get searchButton(): Locator {
    return this.page.locator('#searchBox-wrapper').getByRole('button').first();
  }

  /**
   * Searches books by title.
   * @param title Book title.
   */
  async searchBookByTitle(title: string): Promise<void> {
    await this.searchBar.fill(title);
  }

  /**
   * Opens a book details page by title.
   * @param title Book title.
   */
  async openBookByTitle(title: string): Promise<void> {
    await this.searchBookByTitle(title);
    await this.booksTable.clickBookByTitle(title);
  }
}