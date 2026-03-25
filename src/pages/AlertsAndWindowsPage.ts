import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Alerts and Windows page object model.
 */
export class AlertsAndWindowsPage extends BasePage {
  public readonly header: HeaderComponent;

  /**
   * Creates an instance of AlertsAndWindowsPage.
   * @param page Playwright page object.
   * @param url Page URL path.
   */
  constructor(page: Page, url: string) {
    super(page, url);
    this.header = new HeaderComponent(page, page.getByRole('banner'));
  }

  /**
   * Returns the advertisement iframe by accessible label.
   */
  get advertisementElement(): Locator {
    return this.page.getByLabel('Advertisement');
  }
}
