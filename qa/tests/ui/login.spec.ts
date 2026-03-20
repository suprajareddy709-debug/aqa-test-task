import { test, expect } from '@playwright/test';
import { AuthPage } from '../../pages/login.page.js';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

let username: string;
let email: string;
let password: string;
let auth: AuthPage;

test.describe('Authentication Tests', () => {

  test.beforeAll(() => {
    username = faker.internet.username();
    email = faker.internet.email();
    password = faker.internet.password({ length: 12 }); 
  });
  
  test.beforeEach(async ({ page }) => {
      auth = new AuthPage(page);
      await auth.goto();
  });

  test('should register a new user', async ({ page }) => {
    await auth.createAccountButton.click();
    await auth.register(username, email, password);
    await expect(auth.userProfile).toHaveText(username);
  });

  test('should login with environment user', async ({ page }) => {
    const envUsername = process.env.VIKUNJA_USERNAME!;
    const envPassword = process.env.VIKUNJA_PASSWORD!;

    await auth.login(envUsername, envPassword);
    await expect(page.locator('text=Projects')).toBeVisible();
  });

   test('should not allow registration with empty fields', async ({ page }) => {
    await auth.createAccountButton.click();
    await auth.userNameInputField.fill('')
    await auth.passwordInputField.fill('')
    await auth.emailInputField.fill('');
    await auth.userNameInputField.fill('')
    await expect(auth.registercreateAccount).toBeDisabled();
    await expect(auth.provideUserName).toBeVisible();
    await expect(auth.provideEmail).toBeVisible();
    await expect(auth.providePassword).toBeVisible();
  });

  test('should fail login with incorrect password', async ({ page }) => {
    const envUsername = process.env.VIKUNJA_USERNAME!;
    const wrongPassword = 'WrongPass123!';
    await auth.login(envUsername, wrongPassword);
    await expect(page.locator('text=Wrong username or password.')).toBeVisible();
  });

  test('should fail registration with invalid email', async ({ page }) => {
    await auth.createAccountButton.click();
    await auth.register('testuser', 'invalid-email', 'Test@1234');
    await expect(auth.provideEmail).toBeVisible();
  });

});