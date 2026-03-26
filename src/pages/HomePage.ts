// path: src/pages/HomePage.ts
import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/HeaderComponent';
import { BasePage } from './BasePage';
import { HomePageCard } from './enums/HomePageCard';

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
    return this.page.locator('.category-cards a').nth(0);
  }

  /**
   * Returns the Forms category card locator.
   */
  get formsCard(): Locator {
    return this.page.locator('.category-cards a').nth(1);
  }

  /**
   * Returns the Alerts Frame & Windows category card locator.
   */
  get alertsFrameAndWindowsCard(): Locator {
    return this.page.locator('.category-cards a').nth(2);
  }

  /**
   * Returns the Widgets category card locator.
   */
  get widgetsCard(): Locator {
    return this.page.locator('.category-cards a').nth(3);
  }

  /**
   * Returns the Interactions category card locator.
   */
  get interactionsCard(): Locator {
    return this.page.locator('.category-cards a').nth(4);
  }

  /**
   * Returns the Book Store Application category card locator.
   */
  get bookStoreApplicationCard(): Locator {
    return this.page.locator('.category-cards a').nth(5);
  }

  /**
   * Opens the selected card from the home page.
   * @param option Card name to open.
   */
  async openCardByName(option: HomePageCard): Promise<void> {
    const cards: Record<HomePageCard, Locator> = {
      [HomePageCard.Elements]: this.elementsCard,
      [HomePageCard.Forms]: this.formsCard,
      [HomePageCard.AlertsFrameAndWindows]: this.alertsFrameAndWindowsCard,
      [HomePageCard.Widgets]: this.widgetsCard,
      [HomePageCard.Interactions]: this.interactionsCard,
      [HomePageCard.BookStoreApplication]: this.bookStoreApplicationCard,
    };

    const card = cards[option];

    await card.click();
  }
}
