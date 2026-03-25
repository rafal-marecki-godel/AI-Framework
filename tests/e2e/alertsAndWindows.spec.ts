import { test, expect } from '@fixtures/baseTest';

/**
 * Alerts and Windows page E2E tests.
 */
test.describe('Alerts and Windows page', () => {
  /**
   * Verifies that the advertisement element is visible on the page.
   */
  test('should display the advertisement element when page loads', async ({ alertsAndWindowsPage }) => {
    await test.step('Given the user navigates to the Alerts and Windows page', async () => {
      await alertsAndWindowsPage.navigate();
    });

    await test.step('Then the advertisement element should be visible', async () => {
      await expect(alertsAndWindowsPage.advertisementElement).toBeVisible();
    });
  });
});
