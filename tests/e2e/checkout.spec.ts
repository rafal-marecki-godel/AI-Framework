import { TestUserConfig } from '@config/environment.config';
import { test, expect } from '@fixtures/baseTest';

/**
 * 
 * DemoQA does not have a real checkout flow, 
 * But we can simulate a checkout-like flow by: 
 * - Searching book library, 
 * - Clicking on a book, 
 * - Adding it to user profile, 
 * - Ensuring the book is in the profile
 * - Removing the book from profile
 * - Ensuring the book is removed 
 */
test.describe('Checkout flow', () => {
  test('should add a selected book to profile and remove it', async ({ page, loginPage, bookStorePage, specificBookPage, profilePage }) => {
    const { username, password } = TestUserConfig.bookStoreUser;
    const targetTitle = 'Git Pocket Guide';

    await test.step('Given the user logs in with valid credentials', async () => {
      await loginPage.navigate();
      await loginPage.loginAs(username, password);
      await profilePage.waitForUrl();
    });

    await test.step('And the target book is not already present in profile', async () => {
      await profilePage.navigate();
      if (await profilePage.hasBookInCollection(targetTitle)) {
        await profilePage.deleteBookByTitle(targetTitle);
      }
    });

    await test.step('When the user opens Book Store and searches by title', async () => {
      await bookStorePage.navigate();
      await bookStorePage.searchBookByTitle(targetTitle);
      await bookStorePage.booksTable.clickBookByTitle(targetTitle);
    });

    await test.step('And opens specific book page and adds book to collection', async () => {
      await expect(specificBookPage.addToYourCollectionButton).toBeVisible();
      await specificBookPage.addToCollection();
    });

    await test.step('Then the book should be visible in profile table', async () => {
      await profilePage.navigate();
      await expect(profilePage.booksTable.getTitleLinkByTitle(targetTitle)).toBeVisible();
    });

    await test.step('And the user should be able to remove the book from profile', async () => {
      await profilePage.navigate();
      // Wait for dialog to appear after delete button click
      const dialogPromise = page.waitForEvent('dialog');

      await profilePage.deleteBookByTitle(targetTitle);

      const dialog = await dialogPromise;
      expect(dialog.message()).toContain('Book deleted');
      await dialog.accept();
      
      await expect(profilePage.booksTable.getTitleLinkByTitle(targetTitle)).toHaveCount(0);
    });
  });
});