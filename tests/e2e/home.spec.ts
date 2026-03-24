// path: tests/e2e/home.spec.ts
import { test, expect } from '@fixtures/baseTest';

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
});
