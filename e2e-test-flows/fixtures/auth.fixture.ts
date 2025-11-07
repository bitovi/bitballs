import { test as base } from "@playwright/test";

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
   */
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login
    await page.goto("/");

    // TODO: Implement login logic
    // This is a placeholder - implement actual login when writing tests
    // Example:
    // await page.click('text=Session');
    // await page.fill('input[name="email"]', 'user@example.com');
    // await page.fill('input[name="password"]', 'password123');
    // await page.click('button:has-text("Login")');

    await use(page);
  },

  /**
   * Fixture for an admin user
   */
  adminPage: async ({ page }, use) => {
    // Navigate to login
    await page.goto("/");

    // TODO: Implement admin login logic
    // This is a placeholder - implement actual login when writing tests
    // Example:
    // await page.click('text=Session');
    // await page.fill('input[name="email"]', 'admin@example.com');
    // await page.fill('input[name="password"]', 'adminpass123');
    // await page.click('button:has-text("Login")');

    await use(page);
  },
});

export { expect } from "@playwright/test";
