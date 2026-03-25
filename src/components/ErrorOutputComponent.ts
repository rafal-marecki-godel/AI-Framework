import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Login error output component model.
 */
export class ErrorOutputComponent extends BaseComponent {
  /**
   * Creates an instance of ErrorOutputComponent.
   * @param page Playwright page object.
   * @param locator Root locator for the output container.
   */
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns the output container locator.
   */
  get container(): Locator {
    return this.root;
  }

  /**
   * Returns the invalid credentials error message locator.
   */
  get errorMessage(): Locator {
    return this.root.locator('#name');
  }
}