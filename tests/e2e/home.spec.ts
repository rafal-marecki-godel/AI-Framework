// path: tests/e2e/home.spec.ts
import { test, expect } from '@fixtures/baseTest';
import { HomePageCard } from '@pages/enums/HomePageCard';

/**
 * Home page E2E tests.
 */
test.describe('Home page', () => {
  /**
   * Verifies that DemoQA home page core elements are visible.
   */
  test('should display header logo and category cards', async ({ homePage, page }) => {
    await test.step('Given the user opens the DemoQA home page', async () => {
      await homePage.navigate();
    });

    await test.step('When the home page finishes rendering its main navigation cards', async () => {
      await expect(homePage.header.logoImage).toBeVisible();
      await expect(homePage.elementsCard).toBeVisible();
      await expect(homePage.formsCard).toBeVisible();
      await expect(homePage.widgetsCard).toBeVisible();
    });

    await test.step('Then the browser should remain on the home page', async () => {
      await expect(page).toHaveURL(/demoqa\.com/);
    });
  });

  /**
   * Verifies that the user can navigate from the home page to the Alerts and Windows page.
   */
  test('should navigate from home page to alerts and windows page', async ({ homePage, alertsAndWindowsPage }) => {
    await test.step('Given the user opens the DemoQA home page', async () => {
      await homePage.navigate();
    });

    await test.step('When the user opens the Alerts, Frame & Windows card', async () => {
      await homePage.openCardByName(HomePageCard.AlertsFrameAndWindows);
    });

    await test.step('Then the Alerts and Windows page should be displayed', async () => {
      await alertsAndWindowsPage.waitForUrl();
      await expect(alertsAndWindowsPage.advertisementElement).toBeVisible();
    });
  });

  /**
   * Verifies that the user can navigate from the home page to the Elements page.
   */
  test('should navigate from home page to elements page', async ({ homePage, elementsPage }) => {
    await test.step('Given the user opens the DemoQA home page', async () => {
      await homePage.navigate();
    });

    await test.step('When the user opens the Elements card', async () => {
      await homePage.openCardByName(HomePageCard.Elements);
    });

    await test.step('Then the Elements page should be displayed', async () => {
      await elementsPage.waitForUrl();
      await expect(elementsPage.advertisementElement).toBeVisible();
    });
  });

  /**
   * Verifies that the user can navigate from the home page to the Forms page.
   */
  test('should navigate from home page to forms page', async ({ homePage, formsPage }) => {
    await test.step('Given the user opens the DemoQA home page', async () => {
      await homePage.navigate();
    });

    await test.step('When the user opens the Forms card', async () => {
      await homePage.openCardByName(HomePageCard.Forms);
    });

    await test.step('Then the Forms page should be displayed', async () => {
      await formsPage.waitForUrl();
      await expect(formsPage.advertisementElement).toBeVisible();
    });
  });

  /**
   * Verifies that the user can navigate from the home page to the Widgets page.
   */
  test('should navigate from home page to widgets page', async ({ homePage, widgetsPage }) => {
    await test.step('Given the user opens the DemoQA home page', async () => {
      await homePage.navigate();
    });

    await test.step('When the user opens the Widgets card', async () => {
      await homePage.openCardByName(HomePageCard.Widgets);
    });

    await test.step('Then the Widgets page should be displayed', async () => {
      await widgetsPage.waitForUrl();
      await expect(widgetsPage.advertisementElement).toBeVisible();
    });
  });

  /**
   * Verifies that the user can navigate from the home page to the Interactions page.
   */
  test('should navigate from home page to interactions page', async ({ homePage, interactionsPage }) => {
    await test.step('Given the user opens the DemoQA home page', async () => {
      await homePage.navigate();
    });

    await test.step('When the user opens the Interactions card', async () => {
      await homePage.openCardByName(HomePageCard.Interactions);
    });

    await test.step('Then the Interactions page should be displayed', async () => {
      await interactionsPage.waitForUrl();
      await expect(interactionsPage.advertisementElement).toBeVisible();
    });
  });
});
