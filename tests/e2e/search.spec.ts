// path: tests/e2e/search.spec.ts
import { TestUserConfig } from '@config/environment.config';
import { test, expect } from '@fixtures/baseTest';

/**
 * Book search E2E tests.
 *
 * Note: DemoQA does not have a real search with filters, but the title search box
 * supports partial match and case-insensitive filtering, which is tested here.
 * This list contains a small number of books; if pagination is introduced in the future,
 * tests should be scoped to a known subset of titles.
 */
test.describe('[TC-SEARCH] Book search', () => {
  // TC-SEARCH-001: Search box filters displayed books by partial title, case-insensitively.
  test('[TC-SEARCH-001] should filter table rows by partial title case-insensitively', async ({ loginPage, profilePage, bookStorePage }) => {
    const { username, password } = TestUserConfig.bookStoreUser;
    const partialTitle = 'script';
    let expectedMatchingTitlesCount = 0;

    await test.step('Given the user logs in as valid user', async () => {
      await loginPage.navigate();
      await loginPage.loginAs(username, password);
      await profilePage.waitForUrl();
    });

    // Navigate once; reuse the same page load for both counting and searching.
    await test.step('When the user opens the Book Store page', async () => {
      await bookStorePage.navigate();
    });

    await test.step("And the system counts titles containing word 'script' before applying the search filter", async () => {
      const allTitlesBeforeFiltering = await bookStorePage.booksTable.getAllBookTitles();
      expectedMatchingTitlesCount = allTitlesBeforeFiltering.filter(title =>
        title.toLowerCase().includes(partialTitle.toLowerCase()),
      ).length;
    });

    await test.step("When the user types 'script' into the search box", async () => {
      await bookStorePage.searchBookByTitle(partialTitle);
    });

    await test.step("Then visible titles count should equal pre-counted titles containing 'script'", async () => {
      const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();
      // toHaveLength gives richer failure output than expect(length).toBe(n)
      expect(visibleTitles).toHaveLength(expectedMatchingTitlesCount);
    });

    await test.step("Then all visible book titles should contain the word 'script' case-insensitively", async () => {
      const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();
      for (const title of visibleTitles) {
        expect(title.toLowerCase()).toContain(partialTitle.toLowerCase());
      }
    });
  });
});

