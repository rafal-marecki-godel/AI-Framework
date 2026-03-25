// path: tests/helpers/navigationHelpers.ts
import { expect, test } from '@fixtures/baseTest';
import { BaseCategoryPage } from '@pages';
import { HomePage } from '@pages';
import { HomePageCard } from '@pages/enums/HomePageCard';

/**
 * Navigates from the home page to a category page and verifies the advertisement is visible.
 * @param homePage Home page object.
 * @param card Card to open from the home page.
 * @param targetPage Target category page object.
 */
export async function navigateToCategoryPage(
  homePage: HomePage,
  card: HomePageCard,
  targetPage: BaseCategoryPage,
): Promise<void> {
  await test.step('Given the user opens the DemoQA home page', async () => {
    await homePage.navigate();
  });

  await test.step(`When the user opens the ${card} card`, async () => {
    await homePage.openCardByName(card);
  });

  await test.step(`Then the ${card} page should be displayed`, async () => {
    await targetPage.waitForUrl();
    await expect(targetPage.advertisementElement).toBeVisible();
  });
}
