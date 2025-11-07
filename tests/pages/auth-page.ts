import { Page, Locator, expect } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly logoutLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"], input[type="email"]');
    this.passwordInput = page.locator('input[name="password"], input[type="password"]');
    this.loginButton = page.locator('button[type="submit"], .login-button');
    this.registerLink = page.locator('a:has-text("register"), .register-link');
    this.logoutLink = page.locator('.logout, a[href*="logout"]');
    this.errorMessage = page.locator('.error, .alert-danger, .alert');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsAdmin() {
    await this.page.goto('/login');
    await this.login('admin@bitballs.com', 'password');
    await expect(this.page).toHaveURL('/');
  }

  async loginAsUser() {
    await this.page.goto('/login');
    await this.login('user@bitballs.com', 'password');
    await expect(this.page).toHaveURL('/');
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.logoutLink).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.emailInput).toBeVisible();
  }
}