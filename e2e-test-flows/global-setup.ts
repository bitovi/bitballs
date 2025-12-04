import { chromium, FullConfig, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * Global Setup - Runs once before all test suites
 *
 * Creates test users:
 * 1. Admin user (first user created is always admin)
 * 2. Regular user (second user is not admin)
 *
 * Saves user credentials to a JSON file for use in tests
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

async function registerUser(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  console.log(`  Registering user: ${email}`);

  // Navigate to registration page
  await page.goto("/register");

  // Wait for the registration form to be visible
  await page.waitForSelector('input[id="user-email"]', { state: "visible" });

  // Fill in registration form
  await page.fill('input[id="user-email"]', email);
  await page.fill('input[id="user-password"]', password);
  //   await page.fill('input[name="verifyPassword"]', password);

  // Submit the form
  await page.click('button:has-text("Create")');

  // Wait for registration to complete (navigation or success indicator)
  // Adjust this selector based on actual application behavior
  await page.waitForTimeout(2000); // Simple wait - improve with actual selector

  // Verify we're logged in by checking for session dropdown with email
  const isLoggedIn = await page
    .locator(".session-menu")
    .textContent()
    .then((text) => text?.includes(email))
    .catch(() => false);

  if (!isLoggedIn) {
    throw new Error(`Failed to register user: ${email}`);
  }

  console.log(`  ✓ User registered successfully: ${email}`);
}

async function logoutUser(page: Page): Promise<void> {
  // Click session dropdown
  await page.click(".session-menu");

  // Wait for dropdown to open
  await page.waitForTimeout(500);

  // Click logout button
  await page.click('button:has-text("Logout")');

  // Wait for logout to complete
  await page.waitForTimeout(1000);

  console.log("  ✓ User logged out");
}

async function globalSetup(config: FullConfig) {
  console.log("\n🚀 Global Setup: Creating test users...\n");

  const baseURL = config.projects[0].use.baseURL || "http://localhost:5001";

  // Create test user credentials
  const testUsers: TestUsers = {
    admin: {
      email: `admin-${Date.now()}@bitballs-test.com`,
      password: "TestAdmin123!",
    },
    regular: {
      email: `user-${Date.now()}@bitballs-test.com`,
      password: "TestUser123!",
    },
  };

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL,
  });
  const page = await context.newPage();

  try {
    // Create admin user (first user is always admin)
    console.log("Creating admin user (first user)...");
    await registerUser(page, testUsers.admin.email, testUsers.admin.password);
    await logoutUser(page);

    // Create regular user (second user is not admin)
    console.log("\nCreating regular user...");
    await registerUser(
      page,
      testUsers.regular.email,
      testUsers.regular.password
    );
    await logoutUser(page);

    // Save user credentials to file for use in tests
    fs.writeFileSync(TEST_USERS_FILE, JSON.stringify(testUsers, null, 2));
    console.log(`\n✅ Test users created and saved to ${TEST_USERS_FILE}\n`);
    console.log(`   Admin: ${testUsers.admin.email}`);
    console.log(`   Regular: ${testUsers.regular.email}\n`);
  } catch (error) {
    console.error("\n❌ Failed to create test users:", error);
    throw error;
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

export default globalSetup;

/**
 * Helper function to load test users in tests
 */
export function loadTestUsers(): TestUsers {
  if (!fs.existsSync(TEST_USERS_FILE)) {
    throw new Error(
      "Test users file not found. Make sure global setup ran successfully."
    );
  }
  return JSON.parse(fs.readFileSync(TEST_USERS_FILE, "utf-8"));
}
