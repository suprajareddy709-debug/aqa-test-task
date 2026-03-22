import type { Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly createAccountLink: Locator;
  readonly userProfileName: Locator;

  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly emailError: Locator;

  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  readonly registerButton: Locator;
  readonly loginButton: Locator;
  readonly projectsTab: Locator;

  constructor(private page: Page) {
    this.createAccountLink = this.page.getByRole('link', { name: 'Create account' });
    this.userProfileName = this.page.locator('span.username');

    this.usernameError = this.page.getByText('Please provide a username.');
    this.passwordError = this.page.getByText('Please provide a password.');
    this.emailError = this.page.getByText('Please enter a valid email address.');

    this.usernameInput = this.page.getByLabel('Username').or(this.page.locator('input[name="username"]'));
    this.emailInput = this.page.getByLabel('Email').or(this.page.locator('input[name="email"]'));
    this.passwordInput = this.page.locator('input[name="password"]');

    this.registerButton = this.page.getByRole('button', { name: 'Create account' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.projectsTab = this.page.getByText('Projects');
  }

  async navigateToLogin() {
    await this.page.goto('http://localhost:8080/', {waitUntil: 'load'});
  }

  async registerUser(
  username: string,
  email: string,
  password: string,
  shouldSubmit: boolean = true) {
  await this.usernameInput.fill(username);
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);

  if (shouldSubmit) {
    await this.registerButton.click();
  }
}

  async loginUser(
    username: string, 
    password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}