import { test as base, request, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import { AuthPage } from '../qa/pages/login.page';
import { faker } from '@faker-js/faker';

type MyFixtures = {
  auth: AuthPage;
  randomUser: { username: string; email: string; password: string };
  apiToken: string;
  api: APIRequestContext;
};

export const test = base.extend<MyFixtures>({
  auth: async ({ page }, use) => {
    await use(new AuthPage(page));
  },

  randomUser: async ({}, use) => {
    await use({
      username: faker.internet.username().replace('.', '_'),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    });
  },

  apiToken: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const auth = new AuthPage(page);

    await page.goto('http://localhost:8080/login');
    await auth.loginUser(
      process.env.VIKUNJA_USERNAME!,
      process.env.VIKUNJA_PASSWORD!
    );

    const token = await page.evaluate(() =>
      localStorage.getItem('token')
    );

    if (!token) throw new Error('Token not found');

    await context.close();
    await use(token);
  },

  api: async ({ apiToken }, use) => {
    const apiContext = await request.newContext({
      baseURL: 'http://localhost:8080/api/v1',
      extraHTTPHeaders: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    await use(apiContext);
    await apiContext.dispose();
  },
});

export { expect };