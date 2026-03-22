# QA Automation - Vikunja

## Setup
cd application
docker-compose up -d

## Pre-requities
cd qa
npm install            # install Node.js dependencies
dotnet --version        # ensure .NET SDK is installed
npm install faker       # install Faker for test data generation
install Allure Command-Line Tool and add (eg..,C:\allure\bin) to your Windows PATH
allure --version

## Features
- Playwright + TypeScript
- Login test
- Task CRUD test
- HTML reports with traces, screenshots, and videos
- Page Object Model
- API testing support

## Execute all tests:

npx playwright test

## Run specific tests (e.g., login)

npx playwright test tests/login.spec.ts
we can also use Use .only modifier for specific tests (eg.,test.only)

## Use headless mode for CI or with UI for debugging:

npx playwright test --ui

## Viewing Reports
After tests:
npx playwright show-report

## Generate and Open Allure Reports
allure generate allure-results --clean -o allure-report
allure open allure-report

HTML reports include traces, screenshots on failure, and video recordings for debugging.

## Test Coverage

UI Tests:

tests/login.spec.ts - Validates user authentication flow

tests/task.spec.ts - Task Create, Read, Update, Delete operations

API Tests: Available in framework for REST endpoint validation

Helpers: Reusable utility functions

Pages: Page objects for better modularity and reusability

Environment-specific tests in env/ for configuration handling.

Tests use robust locators (getByRole), are parallel-safe, and focus on critical user journeys.

## Project Structure
qa/
├── tests/              # Test files (*.spec.ts)
├── pages/              # Page objects (locators & actions)
├── helpers/            # Reusable utility functions
├── fixtures/           # Custom Playwright fixtures (auth, api, random user)
├── env/                # Environment configs (.env)
├── playwright.config.ts  # Playwright setup
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── README.md           # Documentation

This structure keeps tests organized and scalable.

---

## Environment & Secrets Configuration

- All credentials (`VIKUNJA_USERNAME`, `VIKUNJA_PASSWORD`, etc.) are stored securely in **repository secrets**.  
- These secrets are injected into your CI/CD pipeline (e.g., GitHub Actions) and **not committed** to the repository.  
- In your GitHub Actions YAML file, reference them like:

```yaml
env:
  VIKUNJA_USERNAME: ${{ secrets.VIKUNJA_USERNAME }}
  VIKUNJA_PASSWORD: ${{ secrets.VIKUNJA_PASSWORD }}
  VIKUNJA_EMAIL: ${{ secrets.VIKUNJA_EMAIL }}
  INVALID_PASSWORD: ${{ secrets.INVALID_PASSWORD }}
  INVALID_EMAIL: ${{ secrets.INVALID_EMAIL }}
