// path: src/components/HeaderComponent.ts
import { expect, type Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Header component model.
 */
export class HeaderComponent extends BaseComponent {
  /**
   * Creates an instance of HeaderComponent.
   * @param page Playwright page object.
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Asserts that the header logo is visible.
   */
  public async expectLogoVisible(): Promise<void> {
    await expect(this.getByTestId('header-logo')).toBeVisible();
  }

  /**
   * Clicks the sign in action in header.
   */
  public async clickSignIn(): Promise<void> {
    await this.getByRole('button', 'Sign in').click();
  }
}
