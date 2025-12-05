const { test, expect } = require("@playwright/test");

test.describe("Login Flow", () => {
  test("user can login with valid credentials", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("http://localhost:5001");

    // Verify the page loaded correctly
    await expect(page).toHaveTitle(/BitBalls/);

    // Click the Login button to reveal the dropdown
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for the login form to appear
    await expect(page.getByRole("textbox", { name: "email" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "password" })).toBeVisible();

    // Fill in the email field
    await page
      .getByRole("textbox", { name: "email" })
      .fill("knazario@bitovi.com");

    // Fill in the password field
    await page.getByRole("textbox", { name: "password" }).fill("bit");

    // Press Enter to submit the login form
    await page.getByRole("textbox", { name: "password" }).press("Enter");

    // Verify successful login by checking for navigation elements that appear only when logged in
    await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Account" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();

    // Verify the New Tournament section appears (only visible to logged-in users)
    await expect(
      page.getByRole("heading", { name: "New Tournament" })
    ).toBeVisible();
  });
});
