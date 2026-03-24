// path: tests/e2e/login.spec.ts
import { TestUserConfig } from '@config/environment.config';
import { test, expect } from '@fixtures/baseTest';

/**
 * Login page E2E tests.
 */
test.describe('Login page', () => {
  /**
   * Verifies successful login redirects to profile page and displays normalized user name.
   */
  test('should login and display books label with lowercased username', async ({ loginPage, profilePage }) => {
    const { username, password } = TestUserConfig.bookStoreUser;

    await test.step('Given the user opens the login page', async () => {
      await loginPage.navigate();
    });

    await test.step('When the user signs in with valid Book Store credentials', async () => {
      await loginPage.loginAs(username, password);
    });

    await test.step('Then the user should land on the profile page', async () => {
      await profilePage.waitForUrl();
      await expect(profilePage.booksLabel).toBeVisible();
    });

    await test.step('And the displayed username should match the expected normalized value', async () => {
      await expect(await profilePage.getUserNameValue()).toBe(username.toLowerCase());
    });
  });
});
