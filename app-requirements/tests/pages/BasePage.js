/**
 * Base Page Object
 * Common functionality shared across all pages
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} path - Path relative to base URL
   */
  async goto(path = "/") {
    await this.page.goto(path);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Take a screenshot
   * @param {string} name - Screenshot filename
   * @param {string} folder - Output folder path
   */
  async screenshot(name, folder = "./e2e/flow-1-user-registration-login") {
    await this.page.screenshot({
      path: `${folder}/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }
}
