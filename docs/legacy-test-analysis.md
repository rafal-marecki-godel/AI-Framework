# Legacy Test Analysis Report

No code changes applied in Chapter 2.

**Scope:** `src/pages/HomePage.ts`, `tests/e2e/main.navigation.spec.ts`, `tests/helpers/navigationHelpers.ts`, `tests/e2e/search.spec.ts`, `tests/e2e/checkout.spec.ts`, `tests/e2e/alertsAndWindows.spec.ts`, `src/pages/BaseCategoryPage.ts`  
**Reviewer role:** Senior SDET  
**Date:** 2026-03-26

---

## Prioritized Issue Checklist

### 🔴 P1 — Correctness / Test Reliability

- [ ] **[Locator] `HomePage` card locators use positional CSS (`nth(n)`)** — `src/pages/HomePage.ts`  
  All six card locators are implemented as `.category-cards a` positional selectors (`nth(0)`–`nth(5)`). Any reordering of cards in the DOM (A/B test, CMS change, new card insertion) silently breaks navigation to the wrong page with no immediate error.  
  _Impact: brittle to markup changes — wrong page navigated to without assertion failure at click time._

---

### 🟠 P2 — Flakiness / Timing

- [ ] **[Hard wait] `page.waitForTimeout(1000)` in navigation test** — `tests/e2e/main.navigation.spec.ts`, line 11  
  The "Given" step navigates via raw `page.goto` and then sleeps for 1 000 ms unconditionally. This is slower than a proper wait and still flaky if the page loads in >1 s on a slow CI agent.  
  _Impact: fixed wait → flakiness on slow environments, unnecessary delay on fast ones._

- [ ] **[Hard wait / Raw navigation] `page.goto('https://demoqa.com')` hardcoded in test** — `tests/e2e/main.navigation.spec.ts`, line 10  
  The test bypasses `homePage.navigate()` and uses a hardcoded absolute URL instead of the `baseURL` configured in `playwright.config.ts`. Changing the environment (staging, local) requires editing the test.  
  _Impact: environment coupling — tests cannot be pointed at a different base URL without code change._

---

## Summary Table

| Priority | Category | Issue | File | Impact |
|----------|----------|-------|------|--------|
| P1 | Locator | Positional `nth()` card selectors | `HomePage.ts` | Brittle to DOM reorder |
| P2 | Timing | `waitForTimeout(1000)` hard wait | `main.navigation.spec.ts` | Flakiness + slowness |
| P2 | Timing | Hardcoded `page.goto('https://demoqa.com')` | `main.navigation.spec.ts` | Environment coupling |
