import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly tournamentsLink: Locator;
  readonly playersLink: Locator;
  readonly usersLink: Locator;
  readonly accountLink: Locator;
  readonly loginDropdown: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tournamentsLink = page.locator('nav a[href*="tournaments"]');
    this.playersLink = page.locator('nav a[href*="players"]');
    this.usersLink = page.locator('nav a[href*="users"]');
    this.accountLink = page.locator('nav a[href*="account"]');
    this.loginDropdown = page.locator('.login-dropdown, .dropdown-toggle:has-text("Login")');
    this.logo = page.locator('.navbar-brand, .logo, [href="/"]');
  }

  async navigateToTournaments() {
    await this.tournamentsLink.click();
    await expect(this.page).toHaveURL(/tournaments/);
  }

  async navigateToPlayers() {
    await this.playersLink.click();
    await expect(this.page).toHaveURL(/players/);
  }

  async navigateToUsers() {
    await this.usersLink.click();
    await expect(this.page).toHaveURL(/users/);
  }

  async navigateToAccount() {
    await this.accountLink.click();
    await expect(this.page).toHaveURL(/account/);
  }

  async clickLogo() {
    await this.logo.click();
    await expect(this.page).toHaveURL('/');
  }

  async expectActiveNavigation(linkText: string) {
    await expect(this.page.locator('nav .active, nav .current')).toContainText(linkText);
  }

  async expectAdminNavigation() {
    await expect(this.usersLink).toBeVisible();
    await expect(this.accountLink).toBeVisible();
  }

  async expectUserNavigation() {
    await expect(this.usersLink).not.toBeVisible();
    await expect(this.accountLink).toBeVisible();
  }

  async expectGuestNavigation() {
    await expect(this.loginDropdown).toBeVisible();
    await expect(this.accountLink).not.toBeVisible();
  }
}