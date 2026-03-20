import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect : {
   timeout: 40 * 100
  },
  retries: 0,
  workers: 1,

  use: {
    baseURL: process.env.BASE_URL,
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