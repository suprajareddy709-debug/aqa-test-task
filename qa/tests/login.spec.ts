import { test } from '@playwright/test';
import { AuthPage } from '../pages/login.page.js';

test('user can register and login', async ({ page }) => {
  const auth = new AuthPage(page);
  await auth.goto();

  const username = 'testuser';
  const password = 'Test@1234';

  await auth.login(username, password);

  await page.waitForSelector('text=Login');
});