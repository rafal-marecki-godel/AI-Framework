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
   * Returns Elements category card link.
   */
  private get elementsCardLink(): Locator {
    return this.getByRole('link', 'Elements');
  }

  /**
   * Returns Forms category card link.
   */
  private get formsCardLink(): Locator {
    return this.getByRole('link', 'Forms');
  }

  /**
   * Returns Widgets category card link.
   */
  private get widgetsCardLink(): Locator {
    return this.getByRole('link', 'Widgets');
  }

  /**
   * Returns the Elements category card locator.
   */
  public get elementsCard(): Locator {
    return this.elementsCardLink;
  }

  /**
   * Returns the Forms category card locator.
   */
  public get formsCard(): Locator {
    return this.formsCardLink;
  }

  /**
   * Returns the Widgets category card locator.
   */
  public get widgetsCard(): Locator {
    return this.widgetsCardLink;
  }

  /**
   * Opens the Elements category from the home page.
   */
  public async openElementsCategory(): Promise<void> {
    await this.elementsCard.click();
  }
}
