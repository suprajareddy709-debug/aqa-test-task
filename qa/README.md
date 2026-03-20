
# QA Automation - Vikunja

## Setup
cd application
docker-compose up -d

## Run Tests
cd qa
npm install
npx playwright test

## to View Reports
 npx playwright show-report

## Features
- Playwright + TypeScript
- Login test
- Task CRUD test
- HTML reports
