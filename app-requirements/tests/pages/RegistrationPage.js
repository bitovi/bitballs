import { BasePage } from "./BasePage.js";

/**
 * Registration/Account Page Object
 * Represents the user registration and account management page
 */
export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.selectors = {
      pageHeading: "h2",
      emailInput: "#user-email",
      passwordInput: "#user-password",
      newPasswordInput: "#user-new-password",
      submitButton: 'button[type="submit"]',
      successMessage: ".alert-success",
      errorMessage: ".alert-danger, .text-danger",
      verificationLabel: 'label:has-text("verify your account")',
      verifiedBadge: '.input-group-addon:has-text("verified")',
      formGroup: ".form-group",
    };
  }

  /**
   * Navigate to registration page
   */
  async goto() {
    await super.goto("/register");
  }

  /**
   * Get page heading text
   */
  async getHeading() {
    return await this.page.textContent(this.selectors.pageHeading);
  }

  /**
   * Register a new user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async register(email, password) {
    await this.page.fill(this.selectors.emailInput, email);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.submitButton);

    // Wait for form submission to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Update password for existing user
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   */
  async updatePassword(currentPassword, newPassword) {
    await this.page.fill(this.selectors.passwordInput, currentPassword);
    await this.page.fill(this.selectors.newPasswordInput, newPassword);
    await this.page.click(this.selectors.submitButton);

    // Wait for form submission to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Check if verification message is displayed
   */
  async isVerificationMessageVisible() {
    return await this.isVisible(this.selectors.verificationLabel);
  }

  /**
   * Check if email is verified
   */
  async isEmailVerified() {
    return await this.isVisible(this.selectors.verifiedBadge);
  }

  /**
   * Get error message if present
   */
  async getErrorMessage() {
    if (await this.isVisible(this.selectors.errorMessage)) {
      return await this.page.textContent(this.selectors.errorMessage);
    }
    return null;
  }

  /**
   * Get success message if present
   */
  async getSuccessMessage() {
    if (await this.isVisible(this.selectors.successMessage)) {
      return await this.page.textContent(this.selectors.successMessage);
    }
    return null;
  }

  /**
   * Check if on registration page (new user)
   */
  async isRegistrationPage() {
    const heading = await this.getHeading();
    return heading.includes("Register New User");
  }

  /**
   * Check if on account page (existing user)
   */
  async isAccountPage() {
    const heading = await this.getHeading();
    return heading.includes("Update User") || heading.includes("Verify User");
  }
}
