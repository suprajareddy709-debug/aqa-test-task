
# QA Automation - Vikunja

## Setup
cd application
docker-compose up -d

## Pre-requities
cd qa
npm install            # install Node.js dependencies
dotnet --version        # ensure .NET SDK is installed
npm install faker       # install Faker for test data generation

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

## HTML reports include traces, screenshots on failure, and video recordings for debugging.

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
├── tests/          # Test files (*.spec.ts)
├── pages/          # Page objects (locators & actions)
├── helpers/        # Reusable utility functions
├── env/            # Environment configs
├── playwright.config.ts  # Playwright setup
├── package.json    # Dependencies
├── tsconfig.json   # TypeScript config
└── README.md       # This file

This structure keeps tests organized and scalable.