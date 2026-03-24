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
    await homePage.navigate();
    await expect(homePage.header.logoImage).toBeVisible();
    await expect(homePage.elementsCard).toBeVisible();
    await expect(homePage.formsCard).toBeVisible();
    await expect(homePage.widgetsCard).toBeVisible();

    await expect(page).toHaveURL(/demoqa\.com/);
  });
});
