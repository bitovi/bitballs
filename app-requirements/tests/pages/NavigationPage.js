import { BasePage } from "./BasePage.js";

/**
 * Navigation Page Object
 * Represents the navigation bar and its interactions
 */
export class NavigationPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.selectors = {
      registerLink: 'a.register-btn, a:has-text("register")',
      loginDropdown: '.dropdown-toggle:has-text("Login"), a:has-text("Login")',
      loginEmailInput: '#user-email-nav, input[placeholder*="email"]',
      loginPasswordInput: '#user-password-nav, input[type="password"]',
      loginSubmitButton:
        '.dropdown-menu button[type="submit"], button:has-text("Login")',
      logoutLink: 'a:has-text("Logout")',
      accountLink: 'a[href*="account"], a:has-text("Account")',
      tournamentsLink: 'a[href*="tournaments"], a:has-text("Tournaments")',
      playersLink: 'a[href*="players"], a:has-text("Players")',
      usersLink: 'a[href*="users"], a:has-text("Users")',
      errorMessage: ".dropdown-menu .text-danger, .text-danger",
      mainLogo: '.main-logo, a:has-text("BitBalls")',
    };
  }

  /**
   * Click on Register link in the navigation dropdown
   */
  async clickRegister() {
    // First open the login dropdown
    await this.page.click(this.selectors.loginDropdown, { timeout: 10000 });
    await this.page.waitForTimeout(1000); // Wait for dropdown animation

    // Then click register
    await this.page.click(this.selectors.registerLink, { timeout: 10000 });
    await this.waitForNavigation();
  }

  /**
   * Login using the navigation dropdown
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async login(email, password) {
    // Open login dropdown
    await this.page.click(this.selectors.loginDropdown, { timeout: 10000 });
    await this.page.waitForTimeout(1000); // Wait for dropdown animation

    // Fill in credentials
    await this.page.fill(this.selectors.loginEmailInput, email, {
      timeout: 10000,
    });
    await this.page.fill(this.selectors.loginPasswordInput, password, {
      timeout: 10000,
    });

    // Submit login form
    await this.page.click(this.selectors.loginSubmitButton, { timeout: 10000 });
    await this.waitForNavigation();
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.page.click(this.selectors.logoutLink);
    await this.waitForNavigation();
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn() {
    return await this.isVisible(this.selectors.logoutLink);
  }

  /**
   * Check if user is logged out
   */
  async isLoggedOut() {
    return await this.isVisible(this.selectors.loginDropdown);
  }

  /**
   * Get login error message
   */
  async getLoginError() {
    if (await this.isVisible(this.selectors.errorMessage)) {
      return await this.page.textContent(this.selectors.errorMessage);
    }
    return null;
  }

  /**
   * Check if Account link is visible (user must be logged in)
   */
  async isAccountLinkVisible() {
    return await this.isVisible(this.selectors.accountLink);
  }

  /**
   * Check if Users link is visible (user must be admin)
   */
  async isUsersLinkVisible() {
    return await this.isVisible(this.selectors.usersLink);
  }

  /**
   * Navigate to Account page
   */
  async goToAccount() {
    await this.page.click(this.selectors.accountLink);
    await this.waitForNavigation();
  }

  /**
   * Navigate to Tournaments page
   */
  async goToTournaments() {
    await this.page.click(this.selectors.tournamentsLink);
    await this.waitForNavigation();
  }
}
