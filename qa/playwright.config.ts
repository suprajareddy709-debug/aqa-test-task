import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect : {
   timeout: 60 * 100
  },
  retries: 0,
  workers: 2,

  use: {
    baseURL: 'http://localhost:8080',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],                  
    ['html', { open: 'never' }]
  ],
projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
    }
  }]
});