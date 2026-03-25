// path: src/pages/HomePage.ts
import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Home page object model.
 */
export class HomePage extends BasePage {
  public readonly header: HeaderComponent;

  /**
   * Creates an instance of HomePage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
    this.header = new HeaderComponent(page, page.getByRole('banner'));
  }

  /**
   * Returns the Elements category card locator.
   */
  get elementsCard(): Locator {
    return this.getByRole('link', 'Elements');
  }

  /**
   * Returns the Forms category card locator.
   */
  get formsCard(): Locator {
    return this.getByRole('link', 'Forms');
  }

  /**
   * Returns the Alerts Frame & Windows category card locator.
   */
  get alertsFrameAndWindowsCard(): Locator {
    return this.getByRole('link', 'Alerts Frame & Windows');
  }

  /**
   * Returns the Widgets category card locator.
   */
  get widgetsCard(): Locator {
    return this.getByRole('link', 'Widgets');
  }

  /**
   * Returns the Interactions category card locator.
   */
  get interactionsCard(): Locator {
    return this.getByRole('link', 'Interactions');
  }

  /**
   * Returns the Book Store Application category card locator.
   */
  get bookStoreApplicationCard(): Locator {
    return this.getByRole('link', 'Book Store Application');
  }

  /**
   * Opens the Elements category from the home page.
   */
  async openElementsCategory(): Promise<void> {
    await this.elementsCard.click();
  }
}
