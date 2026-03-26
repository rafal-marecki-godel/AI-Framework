// path: src/pages/BasePage.ts
import { type Locator, type Page } from '@playwright/test';

/**
 * Base class for all page objects.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly url: string;

  /**
   * Creates an instance of BasePage.
   * @param page Playwright page object.
   * @param url Page-specific URL path.
   */
  protected constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigates to the page URL and waits for DOM to load.
   */
  async navigate(): Promise<import('@playwright/test').Response | null> {
    const response = await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    return response;
  }

  /**
   * Navigates back in browser history with DOM load wait.
   */
  async navigateBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Waits until the browser URL matches the page path.
   * @param timeoutMs Maximum wait time in milliseconds.
   */
  async waitForUrl(timeoutMs = 30_000): Promise<void> {
    await this.page.waitForURL((url) => url.pathname === this.url, { timeout: timeoutMs });
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
