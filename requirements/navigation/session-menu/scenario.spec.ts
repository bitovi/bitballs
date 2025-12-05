import { test, expect } from '@playwright/test';

test.describe('Session Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure we start each test logged out
    await page.goto('/');
    await page.evaluate(() => {
      // Clear any existing session data
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Admin user sees admin-only navigation', async ({ page }) => {
    // Given I am logged in as an admin
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Click login dropdown if present
    const loginDropdown = page.locator('.login-dropdown, .dropdown-toggle:has-text("Login")');
    if (await loginDropdown.count() > 0) {
      await loginDropdown.click();
      await page.waitForTimeout(500); // Wait for dropdown to fully open
    }
    
    // Wait for and interact with email field
    const emailField = page.locator('#user-email-nav');
    await expect(emailField).toBeVisible({ timeout: 5000 });
    await emailField.click(); // Click to focus the field first
    await emailField.clear(); // Clear any existing content
    await emailField.fill('admin@bitballs.com');
    
    // Wait for and interact with password field
    const passwordField = page.locator('#user-password-nav');
    await expect(passwordField).toBeVisible();
    await passwordField.click();
    await passwordField.clear();
    await passwordField.fill('testpassword123');
    await page.click('button[type="submit"], .login-btn, .btn-primary');
    
    // Wait for login to complete
    await page.waitForLoadState('networkidle');
    
    // When I view the navigation menu
    // Then I should see the "Users" link (admin only)
    await expect(page.locator('nav a[href*="users"], a:has-text("Users")')).toBeVisible();
    
    // And I should see the "Account" link
    await expect(page.locator('nav a[href*="account"], a:has-text("Account")')).toBeVisible();
    
    // And I should see the "Logout" link
    await expect(page.locator('nav a[href*="logout"], a:has-text("Logout"), .logout')).toBeVisible();
  });

  test('Non-admin user sees standard navigation', async ({ page }) => {
    // Given I am logged in as a non-admin user
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Click login dropdown if present
    const loginDropdown = page.locator('.login-dropdown, .dropdown-toggle:has-text("Login")');
    if (await loginDropdown.count() > 0) {
      await loginDropdown.click();
      await page.waitForTimeout(500); // Wait for dropdown to fully open
    }
    
    // Wait for and interact with email field
    const emailField = page.locator('#user-email-nav');
    await expect(emailField).toBeVisible({ timeout: 5000 });
    await emailField.click(); // Click to focus the field first
    await emailField.clear(); // Clear any existing content
    await emailField.fill('user@bitballs.com');
    
    // Wait for and interact with password field
    const passwordField = page.locator('#user-password-nav');
    await expect(passwordField).toBeVisible();
    await passwordField.click();
    await passwordField.clear();
    await passwordField.fill('testpassword123');
    await page.click('button[type="submit"], .login-btn, .btn-primary');
    
    // Wait for login to complete
    await page.waitForLoadState('networkidle');
    
    // When I view the navigation menu
    // Then I should NOT see the "Users" link (admin only)
    await expect(page.locator('nav a[href*="users"], a:has-text("Users")')).not.toBeVisible();
    
    // But I should see the "Account" link
    await expect(page.locator('nav a[href*="account"], a:has-text("Account")')).toBeVisible();
    
    // And I should see the "Logout" link
    await expect(page.locator('nav a[href*="logout"], a:has-text("Logout"), .logout')).toBeVisible();
  });

  test('Non-logged-in user sees login form', async ({ page }) => {
    // Given I am not logged in
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // When I view the navigation menu
    // Then I should see a "Login" dropdown or form
    await expect(page.locator('.login-dropdown, .login-form, #user-email-nav')).toBeVisible();
    
    // And I should not see admin or user-specific links
    await expect(page.locator('nav a[href*="users"], a:has-text("Users")')).not.toBeVisible();
    await expect(page.locator('nav a[href*="account"], a:has-text("Account")')).not.toBeVisible();
  });

  test('User logs in via navigation', async ({ page }) => {
    // Given I am not logged in
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // When I click the "Login" dropdown and enter valid credentials
    const loginDropdown = page.locator('.login-dropdown, .dropdown-toggle:has-text("Login")');
    if (await loginDropdown.count() > 0) {
      await loginDropdown.click();
      await page.waitForTimeout(500); // Wait for dropdown to fully open
    }
    
    // Wait for and interact with email field
    const emailField = page.locator('#user-email-nav');
    await expect(emailField).toBeVisible({ timeout: 5000 });
    await emailField.click();
    await emailField.clear();
    await emailField.fill('user@bitballs.com');
    
    // Wait for and interact with password field
    const passwordField = page.locator('#user-password-nav');
    await expect(passwordField).toBeVisible();
    await passwordField.click();
    await passwordField.clear();
    await passwordField.fill('testpassword123');
    await page.click('button[type="submit"], .login-btn, .btn-primary');
    
    // Then I should be logged in
    await page.waitForLoadState('networkidle');
    await expect(page.locator('nav a[href*="logout"], a:has-text("Logout"), .logout')).toBeVisible();
    
    // And the navigation should update to show logged-in user options
    await expect(page.locator('nav a[href*="account"], a:has-text("Account")')).toBeVisible();
  });

  test('User logs in with invalid credentials via navigation', async ({ page }) => {
    // Given I am not logged in
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // When I click the "Login" dropdown and enter invalid credentials
    const loginDropdown = page.locator('.login-dropdown, .dropdown-toggle:has-text("Login")');
    if (await loginDropdown.count() > 0) {
      await loginDropdown.click();
      await page.waitForTimeout(500); // Wait for dropdown to fully open
    }
    
    // Wait for and interact with email field
    const emailField = page.locator('#user-email-nav');
    await expect(emailField).toBeVisible({ timeout: 5000 });
    await emailField.click();
    await emailField.clear();
    await emailField.fill('invalid@test.com');
    
    // Wait for and interact with password field
    const passwordField = page.locator('#user-password-nav');
    await expect(passwordField).toBeVisible();
    await passwordField.click();
    await passwordField.clear();
    await passwordField.fill('wrongpassword');
    await page.click('button[type="submit"], .login-btn, .btn-primary');
    
    // Then I should see an error message
    await expect(page.locator('.error, .alert-danger, .alert, .message')).toBeVisible({ timeout: 5000 });
    
    // And I should remain logged out (login form still visible)
    await expect(page.locator('.login-dropdown, .login-form, #user-email-nav')).toBeVisible();
  });

  test('User clicks register link from navigation', async ({ page }) => {
    // Given I am not logged in
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // When I click the "Login" dropdown and then the register link
    const loginDropdown = page.locator('.login-dropdown, .dropdown-toggle:has-text("Login")');
    if (await loginDropdown.count() > 0) {
      await loginDropdown.click();
    }
    
    await page.click('a:has-text("register"), .register-link, a[href*="register"]');
    
    // Then I should be taken to the registration page
    await expect(page).toHaveURL(/register/);
  });
});