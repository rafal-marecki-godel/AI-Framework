import { type Locator, type Page } from '@playwright/test';
import { BookStoreTableComponent } from './BookStoreTableComponent';

/**
 * Profile books table component model.
 */
export class ProfileBooksTableComponent extends BookStoreTableComponent {
  /**
   * Creates an instance of ProfileBooksTableComponent.
   * @param page Playwright page object.
   * @param locator Root locator for the table.
   */
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns delete action buttons for book rows.
   */
  get deleteButtons(): Locator {
    return this.root.locator('[id^="delete-record-"]');
  }

  /**
   * Returns delete button locator for a book title row.
   * @param title Book title.
   */
  getDeleteButtonByTitle(title: string): Locator {
    const row = this.root.locator('tbody tr').filter({ hasText: title }).first();
    return row.locator('[id^="delete-record-"]');
  }

  /**
   * Clicks delete button for a given book title.
   * @param title Book title.
   */
  async clickDeleteByTitle(title: string): Promise<void> {
    await this.getDeleteButtonByTitle(title).click();
  }
}