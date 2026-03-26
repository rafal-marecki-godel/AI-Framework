// path: tests/e2e/main.navigation.professional.spec.ts
import { test, expect } from '@fixtures/baseTest';
import { type Locator } from '@playwright/test';
import { HomePageCard } from '@pages/enums/HomePageCard';
import { navigateCardAndGoBack } from '../helpers/navigationHelpers';

// ---------------------------------------------------------------------------
// Test suite: Main Navigation
// Covers requirements: Home page card rendering and category page routing.
// ---------------------------------------------------------------------------

// Module-scoped card definitions used across multiple tests. Centralising here
// avoids duplicating the array in every test body (Finding #9).
const EXPECTED_CARD_HREFS: Record<HomePageCard, string> = {
  [HomePageCard.Elements]:              '/elements',
  [HomePageCard.Forms]:                 '/forms',
  [HomePageCard.AlertsFrameAndWindows]: '/alertsWindows',
  [HomePageCard.Widgets]:               '/widgets',
  [HomePageCard.Interactions]:          '/interaction',
  [HomePageCard.BookStoreApplication]:  '/books',
};

test.describe('[TC-NAV] Main Navigation', () => {

  // -------------------------------------------------------------------------
  // TC-NAV-001
  // Requirement: All 6 category cards must be visible on the DemoQA home page.
  // Finding fixed: #1 — bookStoreApplicationCard was missing from the assertion.
  // Finding fixed: #6 — BDD grammar corrected (Given → When → Then).
  // -------------------------------------------------------------------------
  test('[TC-NAV-001] should display all 6 category cards on the home page',
    async ({ homePage }) => {
      await test.step('Given the user opens the DemoQA home page', async () => {
        await homePage.navigate();
      });

      await test.step('When the home page finishes loading its navigation cards', async () => {
        await homePage.waitForUrl();
      });

      await test.step('Then all 6 category cards should be visible', async () => {
        await expect(homePage.elementsCard).toBeVisible();
        await expect(homePage.formsCard).toBeVisible();
        await expect(homePage.alertsFrameAndWindowsCard).toBeVisible();
        await expect(homePage.widgetsCard).toBeVisible();
        await expect(homePage.interactionsCard).toBeVisible();
        await expect(homePage.bookStoreApplicationCard).toBeVisible();
      });
    },
  );

  // -------------------------------------------------------------------------
  // TC-NAV-002
  // Requirement: Each card link must point to the correct internal route.
  // Finding fixed: #2 — replaces weak "did it navigate?" check with an explicit
  //                href assertion, catching misconfigured routes before a click.
  // -------------------------------------------------------------------------
  test('[TC-NAV-002] each category card link should point to the correct URL path',
    async ({ homePage }) => {
      await test.step('Given the user opens the DemoQA home page', async () => {
        await homePage.navigate();
      });

      await test.step('When the home page finishes loading its navigation cards', async () => {
        await homePage.waitForUrl();
      });

      await test.step('Then each card link should carry the correct href attribute', async () => {
        await expect(homePage.elementsCard).toHaveAttribute('href', EXPECTED_CARD_HREFS[HomePageCard.Elements]);
        await expect(homePage.formsCard).toHaveAttribute('href', EXPECTED_CARD_HREFS[HomePageCard.Forms]);
        await expect(homePage.alertsFrameAndWindowsCard).toHaveAttribute('href', EXPECTED_CARD_HREFS[HomePageCard.AlertsFrameAndWindows]);
        await expect(homePage.widgetsCard).toHaveAttribute('href', EXPECTED_CARD_HREFS[HomePageCard.Widgets]);
        await expect(homePage.interactionsCard).toHaveAttribute('href', EXPECTED_CARD_HREFS[HomePageCard.Interactions]);
        await expect(homePage.bookStoreApplicationCard).toHaveAttribute('href', EXPECTED_CARD_HREFS[HomePageCard.BookStoreApplication]);
      });
    },
  );

  // -------------------------------------------------------------------------
  // TC-NAV-003
  // Requirement: Clicking each card navigates to the correct category page and
  //              the browser back button restores the home page.
  // Finding fixed: #4 — separated from TC-NAV-001 so visibility and navigation
  //                are independently traceable requirements.
  // Finding fixed: #3 — ad assertion removed from navigateCardAndGoBack helper.
  // -------------------------------------------------------------------------
  test('[TC-NAV-003] each card should navigate to the correct page and allow returning to Home Page',
    async ({ homePage, elementsPage, formsPage, alertsAndWindowsPage, widgetsPage, interactionsPage, bookStorePage }) => {
      await test.step('Given the user opens the DemoQA home page', async () => {
        await homePage.navigate();
      });

      await test.step('When the home page finishes loading its navigation cards', async () => {
        await homePage.waitForUrl();
      });

      const cards = [
        { card: HomePageCard.Elements,              targetPage: elementsPage },
        { card: HomePageCard.Forms,                 targetPage: formsPage },
        { card: HomePageCard.AlertsFrameAndWindows, targetPage: alertsAndWindowsPage },
        { card: HomePageCard.Widgets,               targetPage: widgetsPage },
        { card: HomePageCard.Interactions,          targetPage: interactionsPage },
        { card: HomePageCard.BookStoreApplication,  targetPage: bookStorePage },
      ];

      for (const { card, targetPage } of cards) {
        await navigateCardAndGoBack(homePage, card, targetPage);
      }
    },
  );

  // -------------------------------------------------------------------------
  // TC-NAV-004 (Edge)
  // Requirement: All card links must be interactable — not disabled or
  //              aria-hidden. Guards against feature-flagged / loading states
  //              where a card is rendered but intentionally non-clickable.
  // -------------------------------------------------------------------------
  test('[TC-NAV-004] all category card links should be enabled and not aria-disabled',
    async ({ homePage }) => {
      await test.step('Given the user opens the DemoQA home page', async () => {
        await homePage.navigate();
      });

      await test.step('When the home page finishes loading its navigation cards', async () => {
        await homePage.waitForUrl();
      });

      await test.step('Then every card link should be visible, enabled, and not aria-disabled', async () => {
        const cardLocators: Locator[] = [
          homePage.elementsCard,
          homePage.formsCard,
          homePage.alertsFrameAndWindowsCard,
          homePage.widgetsCard,
          homePage.interactionsCard,
          homePage.bookStoreApplicationCard,
        ];

        for (const locator of cardLocators) {
          await expect(locator).toBeVisible();
          await expect(locator).toBeEnabled();
          await expect(locator).not.toHaveAttribute('aria-disabled', 'true');
        }
      });
    },
  );

  // -------------------------------------------------------------------------
  // TC-NAV-005 (Edge)
  // Requirement: No card link may have an empty, anchor-only (#), javascript:,
  //              or external-domain href. Catches broken build outputs that
  //              render cards with placeholder hrefs that silently go nowhere
  //              or route outside the application.
  // -------------------------------------------------------------------------
  test('[TC-NAV-005] no category card link should have an empty, anchor-only, or external-domain href',
    async ({ homePage }) => {
      await test.step('Given the user opens the DemoQA home page', async () => {
        await homePage.navigate();
      });

      await test.step('When the home page finishes loading its navigation cards', async () => {
        await homePage.waitForUrl();
      });

      await test.step('Then each card href should be a non-empty, internal, root-relative path', async () => {
        const cardLocators: Locator[] = [
          homePage.elementsCard,
          homePage.formsCard,
          homePage.alertsFrameAndWindowsCard,
          homePage.widgetsCard,
          homePage.interactionsCard,
          homePage.bookStoreApplicationCard,
        ];

        for (const locator of cardLocators) {
          await expect(locator).toBeVisible();

          const href = await locator.getAttribute('href');

          expect(href, 'href must not be null').not.toBeNull();
          expect(href, 'href must not be empty').not.toBe('');
          expect(href, 'href must not be a bare anchor "#"').not.toBe('#');
          expect(href, 'href must not be a javascript: URI').not.toMatch(/^javascript:/i);
          expect(href, 'href must not be an absolute external URL').not.toMatch(/^https?:\/\//);
          expect(href, 'href must be a root-relative path starting with "/"').toMatch(/^\//);
        }
      });
    },
  );

});
