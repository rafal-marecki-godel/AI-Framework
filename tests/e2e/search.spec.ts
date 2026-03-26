import { TestUserConfig } from '@config/environment.config';
import { test, expect } from '@fixtures/baseTest';

/**
 * Book search E2E tests.
 */
test.describe('Book search', () => {
    /**
     * Unfortunately the DemoQA does not have a search with filters, 
     * But we can test the search by title with partial match and case insensitivity, which is a similar thing.
     * 
     * Comment, as if it was a real project:
     * This list contains a small number of books, so if the number of books increases,
     * So that there are many pages, we need to have a subset of books with known titls and their count.
     */
  test("should filter table rows by partial title case-insensitively", async ({ loginPage, profilePage, bookStorePage }) => {
    const { username, password } = TestUserConfig.bookStoreUser;
    const partialTitle = 'script';
    let expectedMatchingTitlesCount = 0;

    await test.step('Given the user logs in as valid user', async () => {
      await loginPage.navigate();
      await loginPage.loginAs(username, password);
      await profilePage.waitForUrl();
    });

    await test.step("And the system counts titles containing word 'script' before search", async () => {
      await bookStorePage.navigate();
      const allTitlesBeforeFiltering = await bookStorePage.booksTable.getAllBookTitles();
      expectedMatchingTitlesCount = allTitlesBeforeFiltering.filter(title =>
        title.toLowerCase().includes(partialTitle.toLowerCase()),
      ).length;
    });

    await test.step("When the user searches by partial title 'script'", async () => {
      await bookStorePage.navigate();
      await bookStorePage.searchBookByTitle(partialTitle);
    });

    await test.step("Then visible titles count should equal pre-counted titles containing 'script'", async () => {
      const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();

      await expect(visibleTitles.length).toBe(expectedMatchingTitlesCount);
    });

    await test.step("And all book titles in table should contain word 'script' case-insensitively", async () => {
      const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();

      for (const title of visibleTitles) {
        expect(title.toLowerCase()).toContain(partialTitle.toLowerCase());
      }
    });
  });
});
