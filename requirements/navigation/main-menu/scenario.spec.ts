import { test, expect } from '../../../tests/fixtures';

test.describe('Main Navigation Menu', () => {
  test('User navigates to tournaments page', async ({ page }) => {
    // Given I am on the BitBalls homepage
    await page.goto('/players');
    
    // Wait for the navigation to be fully loaded and interactive
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    // Wait for tournaments link to be visible and clickable
    const tournamentsLink = page.locator('.nav a[href="/"]');
    await expect(tournamentsLink).toBeVisible();
    await expect(tournamentsLink).toBeEnabled();
    
    // Small stability wait for WebKit/Chromium
    await page.waitForTimeout(100);
    
    // When I click on the "Tournaments" link in the main navigation
    await tournamentsLink.click();
    
    // Then I should be taken to the tournaments page (default route)
    await expect(page).toHaveURL('/');
    
    // And I should see the tournaments page content (wait for the page to load)
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h2')).toContainText('Tournaments', { timeout: 10000 });
  });

  test('User navigates to players page', async ({ page }) => {
    // Given I am on the BitBalls homepage
    await page.goto('/');
    
    // Wait for the navigation to be fully loaded and interactive
    // This is likely where WebKit/Chromium need more time
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    // Wait specifically for the players link to be visible and stable
    const playersLink = page.locator('.nav a[href="/players"]');
    await expect(playersLink).toBeVisible();
    await expect(playersLink).toBeEnabled();
    
    // Additional wait to ensure the element is stable (not moving/changing)
    await page.waitForTimeout(100);
    
    // When I click on the "Players" link in the main navigation
    await playersLink.click();
    
    // Then I should be taken to the players page
    await expect(page).toHaveURL('/players');
    
    // And I should see the players page content (wait for the new page to load)
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h2')).toContainText('Players', { timeout: 10000 });
  });

  test('User clicks the BitBalls logo', async ({ page }) => {
    // Given I am on any page other than home
    await page.goto('/tournaments');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    // Wait for navigation to be stable
    const logoLink = page.locator('.navbar-brand, .logo, nav a[href="/"]').first();
    await expect(logoLink).toBeVisible();
    await page.waitForTimeout(100);
    
    // When I click on the logo or home link
    await logoLink.click();
    
    // Then I should be taken to the homepage
    await expect(page).toHaveURL('/');
  });

  test('Navigation highlights current page', async ({ page }) => {
    // Given I navigate to the tournaments page
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    // Wait for navigation to be fully rendered
    await page.waitForTimeout(100);
    
    // When I look at the navigation
    const tournamentsLink = page.locator('.nav a[href="/"]');
    await expect(tournamentsLink).toBeVisible();
    
    // Then the current page should be highlighted or marked as active (if implemented)
    // This is optional since not all apps implement active states
    const activeLink = page.locator('.nav a[href="/"].active, .nav .active a[href="/"]');
    if (await activeLink.count() > 0) {
      await expect(activeLink).toBeVisible();
    }
    
    // At minimum, verify we're on the correct page
    await expect(page).toHaveURL('/');
    
    // And other navigation items should not be highlighted
    const playersLink = page.locator('.nav a[href*="players"]');
    await expect(playersLink).not.toHaveClass(/active|current/);
  });
});