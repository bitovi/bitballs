import { chromium, FullConfig, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * Global Teardown - Runs once after all test suites
 *
 * Cleans up test users:
 * 1. Logs in as regular user and deletes itself
 * 2. Logs in as admin user and deletes itself
 *
 * Removes the test users JSON file
 */

interface TestUsers {
  admin: {
    email: string;
    password: string;
  };
  regular: {
    email: string;
    password: string;
  };
}

const TEST_USERS_FILE = path.join(__dirname, ".test-users.json");

async function loginUser(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  console.log(`  Logging in as: ${email}`);

  // Navigate to home page
  await page.goto("/");

  // Click session dropdown to open login form
  await page.click(".session-menu");

  // Wait for login form to be visible
  await page.waitForSelector('input[name="email"]', { state: "visible" });

  // Fill in login form
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  // Submit login
  await page.click('button:has-text("Login")');

  // Wait for login to complete
  await page.waitForTimeout(2000); // Simple wait - improve with actual selector

  // Verify we're logged in
  const isLoggedIn = await page
    .locator(".session-menu")
    .textContent()
    .then((text) => text?.includes(email))
    .catch(() => false);

  if (!isLoggedIn) {
    throw new Error(`Failed to login as: ${email}`);
  }

  console.log(`  ✓ Logged in successfully: ${email}`);
}

async function deleteCurrentUser(page: Page): Promise<void> {
  console.log("  Deleting user account...");

  // Navigate to account page
  await page.goto("/account");

  // Wait for account page to load
  await page.waitForTimeout(1000);

  // Look for delete account button
  // Note: The actual selector may vary based on the implementation
  // This assumes there's a delete button on the account page
  const deleteButton = page.locator(
    'button:has-text("Delete Account"), .delete-account-btn, .destroy-btn'
  );

  // Check if delete button exists
  const buttonExists = await deleteButton.count().then((count) => count > 0);

  if (buttonExists) {
    // Click delete button
    await deleteButton.first().click();

    // Handle confirmation dialog if it exists
    page.on("dialog", async (dialog) => {
      console.log(`  Confirming deletion: ${dialog.message()}`);
      await dialog.accept();
    });

    // Wait for deletion to complete
    await page.waitForTimeout(2000);

    console.log("  ✓ User account deleted");
  } else {
    console.log(
      "  ⚠️  Delete button not found on account page - attempting API deletion"
    );

    // Alternative: Delete via API if UI doesn't have delete option
    // This would require knowing the user ID and having API access
    // For now, we'll just log a warning
    console.log(
      "  ⚠️  Note: User deletion via UI not available. Consider implementing API deletion."
    );
  }
}

async function deleteUserViaAPI(page: Page, email: string): Promise<void> {
  console.log(`  Attempting to delete user via API: ${email}`);

  try {
    // Get the current session/user info to find user ID
    const response = await page.request.get("/services/session");
    const session = await response.json();

    if (session && session.user && session.user.id) {
      const userId = session.user.id;
      console.log(`  Found user ID: ${userId}`);

      // Delete the user via API
      const deleteResponse = await page.request.delete(
        `/services/users/${userId}`
      );

      if (deleteResponse.ok()) {
        console.log("  ✓ User deleted via API");
      } else {
        console.log(`  ⚠️  API deletion failed: ${deleteResponse.status()}`);
      }
    }
  } catch (error) {
    console.log(`  ⚠️  Could not delete user via API: ${error}`);
  }
}

async function globalTeardown(config: FullConfig) {
  console.log("\n🧹 Global Teardown: Cleaning up test users...\n");

  // Check if test users file exists
  if (!fs.existsSync(TEST_USERS_FILE)) {
    console.log("  No test users file found. Skipping cleanup.\n");
    return;
  }

  // Load test users
  const testUsers: TestUsers = JSON.parse(
    fs.readFileSync(TEST_USERS_FILE, "utf-8")
  );

  const baseURL = config.projects[0].use.baseURL || "http://localhost:5001";

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL,
  });
  const page = await context.newPage();

  try {
    // Delete regular user first
    console.log("Deleting regular user...");
    await loginUser(page, testUsers.regular.email, testUsers.regular.password);
    await deleteUserViaAPI(page, testUsers.regular.email);
    console.log();

    // Delete admin user
    console.log("Deleting admin user...");
    await loginUser(page, testUsers.admin.email, testUsers.admin.password);
    await deleteUserViaAPI(page, testUsers.admin.email);
    console.log();

    // Remove test users file
    fs.unlinkSync(TEST_USERS_FILE);
    console.log("✅ Test users cleaned up successfully\n");
  } catch (error) {
    console.error("\n❌ Failed to clean up test users:", error);
    console.log(
      "  Note: You may need to manually delete test users from the database\n"
    );
    // Don't throw error to allow tests to complete
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

export default globalTeardown;
