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

    await test.step('And the displayed username should match the username in lowercase', async () => {
      await expect(await profilePage.getUserNameValue()).toBe(username.toLowerCase());
    });
  });

  /**
   * Verifies invalid credentials display the login error message.
   */
  test('should display invalid credentials message for incorrect login data', async ({ loginPage }) => {
    const { username, password } = TestUserConfig.invalidUser;

    await test.step('Given the user opens the login page', async () => {
      await loginPage.navigate();
    });

    await test.step('When the user signs in with invalid credentials', async () => {
      await loginPage.loginAs(username, password);
    });

    await test.step('Then the invalid login message should be displayed', async () => {
      await expect(loginPage.loginErrorOutput.container).toBeVisible();
      await expect(loginPage.loginErrorOutput.errorMessage).toBeVisible();
      await expect(loginPage.loginErrorOutput.errorMessage).toHaveText('Invalid username or password!');
    });
  });
});
