import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
path: path.resolve(process.cwd(), '.env')});

export default defineConfig({
  timeout: 60000,
  expect : {
   timeout: 40 * 100
  },
  retries: 1,
  workers: 2,

  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],                  
    ['html', { open: 'never' }],
    ['allure-playwright', { open: 'never'}]
  ],
projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
    }
  }]
});