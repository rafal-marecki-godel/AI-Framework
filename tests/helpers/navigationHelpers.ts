// path: tests/helpers/navigationHelpers.ts
import { expect, test } from '@fixtures/baseTest';
import { BaseCategoryPage } from '@pages';
import { HomePage } from '@pages';
import { HomePageCard } from '@pages/enums/HomePageCard';

/**
 * Clicks a category card, verifies the target page URL, goes back using the browser's
 * back button, and verifies the home page is restored.
 * @param homePage Home page object.
 * @param page Playwright page object used for browser navigation.
 * @param card Card to open from the home page.
 * @param targetPage Target category page object.
 */
export async function navigateCardAndGoBack(
  homePage: HomePage,
  card: HomePageCard,
  targetPage: BaseCategoryPage,
): Promise<void> {
  await test.step(`When the user clicks the ${card} card`, async () => {
    await homePage.openCardByName(card);
  });

  await test.step(`Then the ${card} page should be displayed`, async () => {
    await targetPage.waitForUrl();
    await expect(targetPage.sideNavPannel).toBeVisible();
    await expect(targetPage.advertisementElement).toBeVisible();
  });

  await test.step('When the user goes back to the Home Page', async () => {
    await targetPage.navigateBack();
  });

  await test.step('Then the user should be back on the Home Page', async () => {
    await homePage.waitForUrl();
  });
}
