// path: src/components/HeaderComponent.ts
import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Header component model.
 */
export class HeaderComponent extends BaseComponent {
  /**
   * Creates an instance of HeaderComponent.
   * @param page Playwright page object.
   * @param locator Root locator used to scope component queries.
   */
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns the header logo image locator.
   */
  get logoImage(): Locator {
    return this.root.getByRole('img').first();
  }

  /**
   * Returns the header logo link locator.
   */
  get logoLink(): Locator {
    return this.root.getByRole('link').first();
  }

  /**
   * Clicks the home logo in the header.
   */
  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }
}
