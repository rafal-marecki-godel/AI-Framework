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
  private get loginHeadingElement(): Locator {
    return this.getByRole('heading', 'Login');
  }

  /**
   * Returns the username input locator.
   */
  private get usernameInputElement(): Locator {
    return this.getByLabel('UserName');
  }

  /**
   * Returns the password input locator.
   */
  private get passwordInputElement(): Locator {
    return this.getByLabel('Password');
  }

  /**
   * Returns the login button locator.
   */
  private get loginButtonElement(): Locator {
    return this.getByRole('button', 'Login');
  }

  /**
   * Returns the new user button locator.
   */
  private get newUserButtonElement(): Locator {
    return this.getByRole('button', 'New User');
  }

  /**
   * Returns the login heading locator.
   */
  public get loginHeading(): Locator {
    return this.loginHeadingElement;
  }

  /**
   * Returns the username input locator.
   */
  public get usernameInput(): Locator {
    return this.usernameInputElement;
  }

  /**
   * Returns the password input locator.
   */
  public get passwordInput(): Locator {
    return this.passwordInputElement;
  }

  /**
   * Returns the login button locator.
   */
  public get loginButton(): Locator {
    return this.loginButtonElement;
  }

  /**
   * Returns the new user button locator.
   */
  public get newUserButton(): Locator {
    return this.newUserButtonElement;
  }

  /**
   * Fills the username field.
   * @param username Username value.
   */
  public async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fills the password field.
   * @param password Password value.
   */
  public async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button.
   */
  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Clicks the new user button.
   */
  public async clickNewUser(): Promise<void> {
    await this.newUserButton.click();
  }

  /**
   * Logs in with the provided credentials.
   * @param username Username value.
   * @param password Password value.
   */
  public async loginAs(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}