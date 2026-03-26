// path: tests/e2e/login.spec.ts
import { TestUserConfig } from '@config/environment.config';
import { test, expect } from '@fixtures/baseTest';

/**
 * Login page E2E tests.
 */
test.describe('[TC-LOGIN] Login page', () => {
  // TC-LOGIN-001: Valid credentials redirect to the profile page and display the normalised username.
  test('[TC-LOGIN-001] should login and display username on profile page', async ({ loginPage, profilePage }) => {
    const { username, password } = TestUserConfig.regularUser;

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

    await test.step('And the displayed username should match the username', async () => {
      await expect(profilePage.userNameValue).toHaveText(username);
    });
  });

  // TC-LOGIN-002: Invalid credentials display the login error message.
  test('[TC-LOGIN-002] should display invalid credentials message for incorrect login data', async ({ loginPage }) => {
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
