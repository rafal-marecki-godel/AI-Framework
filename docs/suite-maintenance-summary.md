# Suite Maintenance Summary

**Golden standard:** `tests/e2e/main.navigation.professional.spec.ts`  
**Date:** 2026-03-26

---

## File Inventory

| File | Status | Action |
|------|--------|--------|
| `main.navigation.professional.spec.ts` | ✅ Golden standard | Keep — no changes needed |
| `main.navigation.refactored.spec.ts` | ⚠️ Intermediate draft | **Delete** — fully superseded by professional spec |
| `main.navigation.spec.ts` | ❌ Broken legacy | **Delete** — hardcoded URL, `waitForTimeout`, missing 6th card, single monolithic test |
| `login.spec.ts` | ⚠️ Minor issues | Keep — fix `await` inside `expect`, add traceability IDs |
| `search.spec.ts` | ⚠️ Moderate issues | Keep — fix double navigate, `await expect(array.length)` antipattern, add traceability IDs |
| `checkout.spec.ts` | ⚠️ Minor issues | Keep — fix double `profilePage.navigate()`, add traceability IDs |
| `alertsAndWindows.spec.ts` | ❌ Flaky / low value | **Delete** — sole assertion is `advertisementElement` visibility, a third-party ad that is blocked in CI/corporate environments and unrelated to AUT behaviour |

---

## Findings by File

### `main.navigation.spec.ts` — DELETE
- `page.goto('https://demoqa.com')` hardcodes the URL, bypassing `baseURL` config — environment coupling
- `page.waitForTimeout(1000)` — unconditional hard wait, flaky on slow CI
- BDD grammar: `Given` followed directly by `Then` — no `When`
- Only 5 of 6 cards checked for visibility; `Book Store Application` missing
- Single monolithic test mixes visibility and navigation assertions
- All issues are fixed in the professional spec

### `main.navigation.refactored.spec.ts` — DELETE
- All content is a strict subset of the professional spec
- Still missing `Book Store Application` in visibility step
- Still merges visibility and navigation in one test (no traceability split)
- No edge-case tests (TC-NAV-004/005 absent)

### `alertsAndWindows.spec.ts` — DELETE
- Entire spec is one test asserting `advertisementElement` visibility
- Ads are third-party iframes — blocked by ad-blockers, corporate proxies, and most CI runners
- No functional AUT behaviour is verified

### `search.spec.ts` — KEEP + CLEAN
1. **Double navigate** — `bookStorePage.navigate()` called in step "count titles" and again in step "search". The second call resets page state unnecessarily and doubles load time
2. **`await expect(visibleTitles.length).toBe(n)`** — `await` is redundant on a plain number; use `expect(array).toHaveLength(n)` for cleaner output
3. `getAllBookTitles()` called separately in two consecutive steps — the second call could reuse the first result
4. No traceability IDs (e.g. `[TC-SEARCH-001]`)
5. No `// path:` file header comment

### `login.spec.ts` — KEEP + CLEAN
1. **`await` inside `expect`**: `expect(await profilePage.getUserNameValue()).toBe(...)` — resolved value passed to `expect`, bypasses Playwright retry mechanism; prefer `await expect(profilePage.userNameElement).toHaveText(...)`
2. No traceability IDs
3. `And` step prefix is non-standard in Playwright BDD (use `Then` for outcome steps)

### `checkout.spec.ts` — KEEP + CLEAN
1. **Double `profilePage.navigate()`** — "Then book visible" step and "And user removes book" step both call `profilePage.navigate()` consecutively; the second is redundant
2. No traceability IDs
3. No `// path:` file header comment

---

## Overlapping Test Coverage

| Scenario | Covered by |
|----------|------------|
| Home page card visibility | `main.navigation.professional.spec.ts` TC-NAV-001 ✅ | `main.navigation.refactored.spec.ts` (partial) ❌ | `main.navigation.spec.ts` (partial, broken) ❌ |
| Card-to-page navigation + back | `main.navigation.professional.spec.ts` TC-NAV-003 ✅ | `main.navigation.refactored.spec.ts` ❌ | `main.navigation.spec.ts` ❌ |

Deleting the two superseded navigation files removes **3 duplicate test scenarios** with no coverage loss.

---

## Consolidation Plan (Priority Order)

1. **Delete** `main.navigation.spec.ts` and `main.navigation.refactored.spec.ts`
2. **Delete** `alertsAndWindows.spec.ts`
3. **Fix** `search.spec.ts` — remove double navigate; replace `await expect(length).toBe` with `expect(array).toHaveLength`; add `[TC-SEARCH-001]` ID
4. **Fix** `checkout.spec.ts` — remove redundant `profilePage.navigate()`; add `[TC-CHECKOUT-001]` ID
5. **Fix** `login.spec.ts` — replace raw `await` inside `expect` with a Playwright assertion; add `[TC-LOGIN-001/002]` IDs

---

## Representative Diff — `search.spec.ts`

```diff
--- a/tests/e2e/search.spec.ts
+++ b/tests/e2e/search.spec.ts
+// path: tests/e2e/search.spec.ts
 import { TestUserConfig } from '@config/environment.config';
 import { test, expect } from '@fixtures/baseTest';
 
 test.describe('Book search', () => {
-  test("should filter table rows by partial title case-insensitively", async ({ loginPage, profilePage, bookStorePage }) => {
+  // TC-SEARCH-001: Search box filters displayed books by partial title, case-insensitively.
+  test('[TC-SEARCH-001] should filter table rows by partial title case-insensitively', async ({ loginPage, profilePage, bookStorePage }) => {
     const { username, password } = TestUserConfig.bookStoreUser;
     const partialTitle = 'script';
     let expectedMatchingTitlesCount = 0;
 
     await test.step('Given the user logs in as valid user', async () => {
       await loginPage.navigate();
       await loginPage.loginAs(username, password);
       await profilePage.waitForUrl();
     });
 
-    await test.step("And the system counts titles containing word 'script' before search", async () => {
-      await bookStorePage.navigate();
-      const allTitlesBeforeFiltering = await bookStorePage.booksTable.getAllBookTitles();
+    // Navigate once; reuse the same page load for both counting and searching.
+    await test.step("When the user opens the Book Store page", async () => {
+      await bookStorePage.navigate();
+    });
+
+    await test.step("And the system counts titles containing word 'script' before applying the search filter", async () => {
+      const allTitlesBeforeFiltering = await bookStorePage.booksTable.getAllBookTitles();
       expectedMatchingTitlesCount = allTitlesBeforeFiltering.filter(title =>
         title.toLowerCase().includes(partialTitle.toLowerCase()),
       ).length;
     });
 
-    await test.step("When the user searches by partial title 'script'", async () => {
-      await bookStorePage.navigate();
-      await bookStorePage.searchBookByTitle(partialTitle);
+    await test.step("When the user types 'script' into the search box", async () => {
+      await bookStorePage.searchBookByTitle(partialTitle);
     });
 
     await test.step("Then visible titles count should equal pre-counted titles containing 'script'", async () => {
       const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();
-
-      await expect(visibleTitles.length).toBe(expectedMatchingTitlesCount);
+      // Use toHaveLength for richer failure output; no await needed on plain array
+      expect(visibleTitles).toHaveLength(expectedMatchingTitlesCount);
     });
 
-    await test.step("And all book titles in table should contain word 'script' case-insensitively", async () => {
-      const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();
-
+    await test.step("Then all visible book titles should contain the word 'script' case-insensitively", async () => {
+      const visibleTitles = await bookStorePage.booksTable.getAllBookTitles();
       for (const title of visibleTitles) {
         expect(title.toLowerCase()).toContain(partialTitle.toLowerCase());
       }
     });
   });
 });
```

# Review and decisions:
* As said in the task, applied directly all of the AI suggestions to one file. That file is search.spec.ts, the rest is reviewed manually, and the suggestions are either accepted or discarded.
* So let's start with the `alertsAndWindows.spec.ts`. The AI wants me to delete it, mentiones that the AdBlockers might disable it, we do not worry about that. What we worry about is the CI not being able to read it. This might be a problem. Removing that test.
* It also wants me to remove `main.navigation.spec.ts` and `main.navigation.refactored.spec.ts`, we can do that, since we already expanded on it in the `main.navigation.professional.ts`. And the respecive changes to them can be seen in the commit history (for the reviewer.)
* In `login.spec.ts`, it suggested this:
    * Use the locator directly so Playwright can auto-retry — avoids bypassing the retry mechanism with `expect(await getValue()).toBe(...)`.
    * Change:
      await expect(profilePage.userNameValue).toHaveText(username.toLowerCase());
    * It seems reasonable, so I approved it.
    * It also wanted to change the last BDD mark from AND to THEN, which does not seem right in this curcumstance. Not implemented.
* In `checkout.spec.ts` it correctly found that we are doing a double navigate at one point. Also that test was missing the path in the first line, which was present in every other test. Accepted.
* Also adde the IDs to each test case, which was approved by me.

