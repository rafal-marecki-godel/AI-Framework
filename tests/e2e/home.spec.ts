// path: tests/e2e/home.spec.ts
import { test, expect } from '@fixtures/baseTest';
import { HomePage } from '@pages/HomePage';

/**
 * Home page E2E tests.
 */
test.describe('Home page', () => {
  /**
   * Verifies that home page core elements are visible.
   */
  test('should display home heading and header logo', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.expectHeadingVisible();
    await homePage.header.expectLogoVisible();

    await expect(page).toHaveURL(/.*/);
  });
});
