// path: src/pages/ProfilePage.ts
import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Profile page object model.
 */
export class ProfilePage extends BasePage {
  public readonly header: HeaderComponent;

  /**
   * Creates an instance of ProfilePage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
    this.header = new HeaderComponent(page, page.getByRole('banner'));
  }

  /**
   * Returns the Books label locator.
   */
  private get booksLabelElement(): Locator {
    return this.page.locator('label').filter({ hasText: 'Books :' });
  }

  /**
   * Returns the user name value locator.
   */
  private get userNameValueElement(): Locator {
    return this.page.locator('#userName-value');
  }

  /**
   * Returns the Books label locator.
   */
  public get booksLabel(): Locator {
    return this.booksLabelElement;
  }

  /**
   * Returns the user name value locator.
   */
  public get userNameValue(): Locator {
    return this.userNameValueElement;
  }

  /**
   * Returns the current user name value.
   */
  public async getUserNameValue(): Promise<string> {
    const value = await this.userNameValue.textContent();
    return value?.trim() ?? '';
  }
}
