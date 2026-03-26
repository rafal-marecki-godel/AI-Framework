// path: tests/e2e/main.navigation.spec.ts
import { test, expect } from '@fixtures/baseTest';
import { HomePageCard } from '@pages/enums/HomePageCard';
import { navigateCardAndGoBack } from '../helpers/navigationHelpers';

test.describe('Main Navigation', () => {
  test(
    'should display all cards and each card should navigate to the correct page and allow returning to Home Page',
    async ({ homePage, elementsPage, formsPage, alertsAndWindowsPage, widgetsPage, interactionsPage, page }) => {
      await test.step('Given the user opens the DemoQA home page', async () => {
        await page.goto('https://demoqa.com');
        await page.waitForTimeout(1000);
      });

      await test.step('Then all category cards should be visible', async () => {
        await expect(homePage.elementsCard).toBeVisible();
        await expect(homePage.formsCard).toBeVisible();
        await expect(homePage.alertsFrameAndWindowsCard).toBeVisible();
        await expect(homePage.widgetsCard).toBeVisible();
        await expect(homePage.interactionsCard).toBeVisible();
      });

      const cards = [
        { card: HomePageCard.Elements,              targetPage: elementsPage },
        { card: HomePageCard.Forms,                 targetPage: formsPage },
        { card: HomePageCard.AlertsFrameAndWindows, targetPage: alertsAndWindowsPage },
        { card: HomePageCard.Widgets,               targetPage: widgetsPage },
        { card: HomePageCard.Interactions,          targetPage: interactionsPage },
      ];

      for (const { card, targetPage } of cards) {
        await navigateCardAndGoBack(homePage, card, targetPage);
      }
    },
  );
});
