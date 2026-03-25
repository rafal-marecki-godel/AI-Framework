// path: src/pages/LoginPage.ts
import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Login page object model.
 */
export class LoginPage extends BasePage {
  public readonly header: HeaderComponent;

  /**
   * Creates an instance of LoginPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
    this.header = new HeaderComponent(page, page.getByRole('banner'));
  }

  /**
   * Returns the login heading locator.
   */
  get loginHeading(): Locator {
    return this.getByRole('heading', 'Login');
  }

  /**
   * Returns the username input locator.
   * There is no good locator for that element, so we have to use the id attribute which is not ideal.
   */
  get usernameInput(): Locator {
    return this.page.locator('#userName');
  }

  /**
   * Returns the password input locator.
   * There is no good locator for that element, so we have to use the id attribute which is not ideal.
   */
  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  /**
   * Returns the login button locator.
   */
  get loginButton(): Locator {
    return this.getByRole('button', 'Login');
  }

  /**
   * Returns the new user button locator.
   */
  get newUserButton(): Locator {
    return this.getByRole('button', 'New User');
  }

  /**
   * Fills the username field.
   * @param username Username value.
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fills the password field.
   * @param password Password value.
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button.
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Clicks the new user button.
   */
  async clickNewUser(): Promise<void> {
    await this.newUserButton.click();
  }

  /**
   * Logs in with the provided credentials.
   * @param username Username value.
   * @param password Password value.
   */
  async loginAs(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}