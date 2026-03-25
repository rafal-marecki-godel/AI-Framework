// path: tests/e2e/home.spec.ts
import { test, expect } from '@fixtures/baseTest';
import { HomePageCard } from '@pages/enums/HomePageCard';
import { navigateToCategoryPage } from '../helpers/navigationHelpers';

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
    await navigateToCategoryPage(homePage, HomePageCard.AlertsFrameAndWindows, alertsAndWindowsPage);
  });

  /**
   * Verifies that the user can navigate from the home page to the Elements page.
   */
  test('should navigate from home page to elements page', async ({ homePage, elementsPage }) => {
    await navigateToCategoryPage(homePage, HomePageCard.Elements, elementsPage);
  });

  /**
   * Verifies that the user can navigate from the home page to the Forms page.
   */
  test('should navigate from home page to forms page', async ({ homePage, formsPage }) => {
    await navigateToCategoryPage(homePage, HomePageCard.Forms, formsPage);
  });

  /**
   * Verifies that the user can navigate from the home page to the Widgets page.
   */
  test('should navigate from home page to widgets page', async ({ homePage, widgetsPage }) => {
    await navigateToCategoryPage(homePage, HomePageCard.Widgets, widgetsPage);
  });

  /**
   * Verifies that the user can navigate from the home page to the Interactions page.
   */
  test('should navigate from home page to interactions page', async ({ homePage, interactionsPage }) => {
    await navigateToCategoryPage(homePage, HomePageCard.Interactions, interactionsPage);
  });
});
