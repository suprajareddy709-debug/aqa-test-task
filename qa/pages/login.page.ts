import type{ Page , Locator } from '@playwright/test';

export class AuthPage {
  readonly createAccountButton: Locator;
  readonly userProfile: Locator;
  readonly provideUserName: Locator;
  readonly providePassword: Locator;
  readonly provideEmail: Locator;
  readonly userNameInputField: Locator;
  readonly emailInputField: Locator;
  readonly passwordInputField: Locator;
  readonly registercreateAccount: Locator;

  constructor(private page: Page) {
    this.createAccountButton = this.page.locator('//a[text()="Create account"]');
    this.userProfile = this.page.locator('span.username');
    this.provideUserName = this.page.locator('p', {hasText: 'Please provide a username.'})
    this.providePassword = this.page.locator('p', {hasText: 'Please provide a password.'})
    this.provideEmail = this.page.locator('p', {hasText: 'Please enter a valid email address.'});
    this.userNameInputField = this.page.locator('input[name="username"]');
    this.emailInputField = this.page.locator('input[name="email"]');
    this.passwordInputField = this.page.locator('input[name="password"]');
    this.registercreateAccount = this.page.locator('//button/span[text()="Create account"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async register(username: string, email: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('//button/span[text()="Create account"]');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('//button/span[text()="Login"]');
  }
}