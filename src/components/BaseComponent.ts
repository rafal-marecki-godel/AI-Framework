// path: src/components/BaseComponent.ts
import { type Locator, type Page } from '@playwright/test';

/**
 * Base class for reusable page components.
 */
export class BaseComponent {
  protected readonly page: Page;

  /**
   * Creates an instance of BaseComponent.
   * @param page Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns a component element by ARIA role and name.
   * @param role ARIA role.
   * @param name Accessible name.
   */
  protected getByRole(role: Parameters<Page['getByRole']>[0], name: string): Locator {
    return this.page.getByRole(role, { name });
  }

  /**
   * Returns a component element by form label.
   * @param label Label text.
   */
  protected getByLabel(label: string): Locator {
    return this.page.getByLabel(label);
  }

  /**
   * Returns a component element by test id.
   * @param testId Data test id value.
   */
  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
