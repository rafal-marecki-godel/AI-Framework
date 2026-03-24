// path: src/pages/BasePage.ts
import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Base class for all page objects.
 */
export class BasePage {
  protected readonly page: Page;

  /**
   * Creates an instance of BasePage.
   * @param page Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a relative URL path.
   * @param path Relative route path.
   */
  public async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Waits until a test id based element is visible.
   * @param testId Data test id value.
   */
  public async waitForTestIdVisible(testId: string): Promise<void> {
    await expect(this.getByTestId(testId)).toBeVisible();
  }

  /**
   * Returns an element by ARIA role and name.
   * @param role ARIA role.
   * @param name Accessible name.
   */
  protected getByRole(role: Parameters<Page['getByRole']>[0], name: string): Locator {
    return this.page.getByRole(role, { name });
  }

  /**
   * Returns an element by form label.
   * @param label Label text.
   */
  protected getByLabel(label: string): Locator {
    return this.page.getByLabel(label);
  }

  /**
   * Returns an element by test id.
   * @param testId Data test id value.
   */
  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
