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
   * Returns the header logo image element.
   */
  private get logoImageElement(): Locator {
    return this.root.getByRole('img').first();
  }

  /**
   * Returns the header home logo link.
   */
  private get logoLinkElement(): Locator {
    return this.root.getByRole('link').first();
  }

  /**
   * Returns the header logo image locator.
   */
  public get logoImage(): Locator {
    return this.logoImageElement;
  }

  /**
   * Clicks the home logo in the header.
   */
  public async clickLogo(): Promise<void> {
    await this.logoLinkElement.click();
  }
}
