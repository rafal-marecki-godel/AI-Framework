// path: src/pages/ProfilePage.ts
import { type Locator, type Page } from '@playwright/test';
import { ProfileBooksTableComponent } from '@components/ProfileBooksTableComponent';
import { BaseCategoryPage } from './BaseCategoryPage';

/**
 * Profile page object model.
 */
export class ProfilePage extends BaseCategoryPage {
  public readonly booksTable: ProfileBooksTableComponent;

  /**
   * Creates an instance of ProfilePage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
    this.booksTable = new ProfileBooksTableComponent(page, page.getByRole('table').first());
  }

  /**
   * Returns the Books label locator.
   */
  get booksLabel(): Locator {
    return this.page.locator('label').filter({ hasText: 'Books :' });
  }

  /**
   * Returns the user name value locator.
   */
  get userNameValue(): Locator {
    return this.page.locator('#userName-value');
  }

  /**
   * Returns the delete confirmation OK button locator.
   */
  get confirmDeleteOkButton(): Locator {
    return this.page.locator('#closeSmallModal-ok');
  }

  /**
   * Returns the current user name value.
   */
  async getUserNameValue(): Promise<string> {
    const value = await this.userNameValue.textContent();
    return value?.trim() ?? '';
  }

  /**
   * Checks whether a book with given title exists in profile table.
   * @param title Book title.
   */
  async hasBookInCollection(title: string): Promise<boolean> {
    return this.booksTable.hasBookTitle(title);
  }

  /**
   * Deletes a book from profile table by title and confirms deletion.
   * @param title Book title.
   */
  async deleteBookByTitle(title: string): Promise<void> {
    await this.booksTable.clickDeleteByTitle(title);
    await this.confirmDeleteOkButton.click();
  }
}
