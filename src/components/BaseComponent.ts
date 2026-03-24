// path: src/components/BaseComponent.ts
import { type Locator, type Page } from '@playwright/test';

/**
 * Base class for reusable page components.
 */
export abstract class BaseComponent {
  protected readonly page: Page;
  protected readonly root: Locator;

  /**
   * Creates an instance of BaseComponent.
   * @param page Playwright page object.
   * @param locator Root locator used to scope component queries.
   */
  protected constructor(page: Page, locator: Locator) {
    this.page = page;
    this.root = locator;
  }

  /**
   * Returns a component element by ARIA role and name.
   * @param role ARIA role.
   * @param name Accessible name.
   */
  protected getByRole(role: Parameters<Page['getByRole']>[0], name: string): Locator {
    return this.root.getByRole(role, { name });
  }

  /**
   * Returns a component element by form label.
   * @param label Label text.
   */
  protected getByLabel(label: string): Locator {
    return this.root.getByLabel(label);
  }

  /**
   * Returns a component element by test id.
   * @param testId Data test id value.
   */
  protected getByTestId(testId: string): Locator {
    return this.root.getByTestId(testId);
  }
}
