import { test, expect } from '../../fixture';

test.describe('Authentication Tests', { tag: ['@Vikunja'] }, () => {

  test.beforeEach(async ({ auth }) => {
    await auth.navigateToLogin();
  });

  test('should register a new user', { tag: ['@regression', '@smoke'] }, async ({ auth, randomUser }) => {
    await auth.createAccountLink.click();
    await auth.registerUser(randomUser.username, randomUser.email, randomUser.password);
    await expect(auth.userProfileName).toHaveText(randomUser.username);
  });

  test('should login with environment user', { tag: ['@smoke', '@login'] }, async ({ auth }) => {
    const username = process.env.VIKUNJA_USERNAME!;
    const password = process.env.VIKUNJA_PASSWORD!;
    await auth.loginUser(username, password);
    await expect(auth.projectsTab).toBeVisible();
  });

  test('should not allow registration with empty fields', { tag: ['@negative', '@regression'] }, async ({ auth }) => {
    await auth.createAccountLink.click();
    await auth.usernameInput.fill('');
    await auth.passwordInput.fill('');
    await auth.emailInput.fill('');
    await auth.passwordInput.fill('');
    await expect(auth.registerButton).toBeDisabled();
    await expect(auth.usernameError).toBeVisible();
    await expect(auth.emailError).toBeVisible();
    await expect(auth.passwordError).toBeVisible();
  });

  test('should fail login with incorrect password', { tag: ['@negative', '@login'] }, async ({ auth, page }) => {
    const username = process.env.VIKUNJA_USERNAME!;
    const wrongPassword = process.env.INVALID_PASSWORD!;
    await auth.loginUser(username, wrongPassword);
    await expect(page.getByText('Wrong username or password.')).toBeVisible();
  });

  test('should fail registration with invalid email', { tag: ['@negative', '@regression'] }, async ({ auth }) => {
    const username = process.env.VIKUNJA_USERNAME!;
    const password = process.env.VIKUNJA_PASSWORD!;
    const invalidEmail = process.env.INVALID_EMAIL!;
    await auth.createAccountLink.click();
    await auth.registerUser(username, invalidEmail, password, false);
    await expect(auth.emailError).toBeVisible();
  });

});