import { test as base } from "@playwright/test";
import { loadTestUsers } from "../global-setup";

/**
 * Custom fixture for authenticated users
 * Usage: import { test } from '../fixtures/auth.fixture';
 */

type AuthFixtures = {
  authenticatedPage: any;
  adminPage: any;
};

export const test = base.extend<AuthFixtures>({
  /**
   * Fixture for a regular authenticated user
   * Automatically logs in using the test user created in global setup
   */
  authenticatedPage: async ({ page }, use) => {
    const testUsers = loadTestUsers();

    // Navigate to home page
    await page.goto("/");

    // Click session dropdown to open login form
    await page.click(".session-menu");

    // Wait for login form to be visible
    await page.waitForSelector('input[name="email"]', { state: "visible" });

    // Fill in login form with regular user credentials
    await page.fill('input[name="email"]', testUsers.regular.email);
    await page.fill('input[name="password"]', testUsers.regular.password);

    // Submit login
    await page.click('button:has-text("Login")');

    // Wait for login to complete
    await page.waitForTimeout(2000);

    // Use the authenticated page in the test
    await use(page);

    // Logout after test (cleanup)
    try {
      await page.click(".session-menu");
      await page.click('button:has-text("Logout")');
      await page.waitForTimeout(1000);
    } catch (error) {
      // Ignore logout errors
    }
  },

  /**
   * Fixture for an admin user
   * Automatically logs in using the admin user created in global setup
   */
  adminPage: async ({ page }, use) => {
    const testUsers = loadTestUsers();

    // Navigate to home page
    await page.goto("/");

    // Click session dropdown to open login form
    await page.click(".session-menu");

    // Wait for login form to be visible
    await page.waitForSelector('input[name="email"]', { state: "visible" });

    // Fill in login form with admin user credentials
    await page.fill('input[name="email"]', testUsers.admin.email);
    await page.fill('input[name="password"]', testUsers.admin.password);

    // Submit login
    await page.click('button:has-text("Login")');

    // Wait for login to complete
    await page.waitForTimeout(2000);

    // Use the authenticated page in the test
    await use(page);

    // Logout after test (cleanup)
    try {
      await page.click(".session-menu");
      await page.click('button:has-text("Logout")');
      await page.waitForTimeout(1000);
    } catch (error) {
      // Ignore logout errors
    }
  },
});

export { expect } from "@playwright/test";
