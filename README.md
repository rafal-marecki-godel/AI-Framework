# Test Framework For DemoQA
Playwright end-to-end test framework for [DemoQA](https://demoqa.com) — built as part of an AI-assisted training exercise exploring test automation design, CI/CD integration, and GitHub Actions workflows

## Requirements

- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://classic.yarnpkg.com/) v1.x

## Setup

**1. Clone the repository**
```bash
git clone https://github.com/rafal-marecki-godel/AI-Framework.git
cd AI-Framework
```

**2. Install dependencies**
```bash
yarn install
```

**3. Install Playwright browsers**
```bash
yarn playwright install chromium --with-deps
```

**4. Configure environment**

Copy the example env file and adjust values if needed:
```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `https://demoqa.com` | Target application URL |
| `PW_RETRIES` | `2` | Number of test retries on failure |
| `PW_TEST_TIMEOUT_MS` | `30000` | Timeout per test (ms) |
| `PW_EXPECT_TIMEOUT_MS` | `5000` | Timeout for assertions (ms) |
| `PW_HEADLESS` | `true` | Run browser in headless mode |
| `PW_WORKERS` | `3` | Number of parallel workers |

## Running Tests

```bash
# Run all tests (headless)
yarn test:e2e

# Run with browser visible
yarn test:e2e:headed

# Run in interactive UI mode
yarn test:e2e:ui

# Run in debug mode
yarn test:e2e:debug
```

## CI

Tests run automatically on every pull request targeting `main` and on every push to `main`.

The HTML report is published to [GitHub Pages](https://rafal-marecki-godel.github.io/AI-Framework/) after each merge to `main`.

## Notes on DemoQA

DemoQA has no `data-test-id` attributes and limited ARIA roles, so some selectors fall back to CSS where unavoidable. The "checkout" flow is a book store mechanic: search → add to profile → verify → remove. Search filtering is partial title match only.
