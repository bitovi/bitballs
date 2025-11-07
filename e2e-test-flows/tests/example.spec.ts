import { test, expect } from "@playwright/test";

/**
 * EXAMPLE TEST FILE
 *
 * This is a template showing the basic structure for Playwright tests.
 * Actual tests should be written based on the flow documents.
 *
 * Reference: README.md for flow documentation
 */

test.describe("Example Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Setup that runs before each test
    await page.goto("/");
  });

  test("should load the home page", async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/BitBalls/);

    // Verify navigation is present
    const navigation = page.locator("bitballs-navigation");
    await expect(navigation).toBeVisible();
  });

  test.skip("example test - skipped", async ({ page }) => {
    // Use test.skip for tests that aren't ready yet
    // TODO: Implement based on authentication flow
  });
});

/**
 * Example of testing specific browser viewport
 */
test.describe("Mobile view", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should display mobile navigation", async ({ page }) => {
    await page.goto("/");
    // Add mobile-specific assertions
  });
});

/**
 * Example of using custom timeout
 */
test("slow operation", async ({ page }) => {
  test.slow(); // Triples the timeout for this test

  await page.goto("/");
  // Add test for slow-loading feature
});
