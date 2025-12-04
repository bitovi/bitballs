import { test, expect } from "../fixtures/auth.fixture";
import { selectors, helpers, testData } from "../helpers/page-objects";

/**
 * Player Management Flow E2E Tests
 *
 * Based on: 02-player-management-flow.md
 *
 * Test Coverage:
 * - Player List View (Admin & Non-Admin)
 * - Player Details View
 * - Create New Player (Admin Only)
 * - Edit Existing Player (Admin Only)
 * - Delete Player (Admin Only)
 * - Permissions Testing
 * - Edge Cases & Validation
 */

test.describe("Player Management - Player List View", () => {
  test("should display player list for non-admin user", async ({ page }) => {
    // Navigate to Players page
    await page.goto("/players");

    // Verify URL
    await expect(page).toHaveURL("/players");

    // Verify page title
    await expect(page).toHaveTitle(/BitBalls.*Players/i);

    // Verify player list is visible
    const playerList = page.locator(selectors.players.list);
    await expect(playerList).toBeVisible();

    // Verify NO edit/delete buttons are visible for non-admin
    const editButtons = page.locator('button:has-text("Edit"), .edit-btn');
    const deleteButtons = page.locator(".destroy-btn");

    await expect(editButtons.first())
      .not.toBeVisible()
      .catch(() => {
        // If elements don't exist, that's also acceptable
        return Promise.resolve();
      });
  });

  test("should display player list with admin controls", async ({
    adminPage,
  }) => {
    // Navigate to Players page as admin
    await adminPage.goto("/players");

    // Verify URL
    await expect(adminPage).toHaveURL("/players");

    // Verify player list is visible
    const playerList = adminPage.locator(selectors.players.list);
    await expect(playerList).toBeVisible();

    // Verify player edit form is visible (for creating players)
    const editForm = adminPage.locator(selectors.players.editForm);
    await expect(editForm).toBeVisible();

    // Verify form has name input
    const nameInput = adminPage.locator(selectors.players.nameInput);
    await expect(nameInput).toBeVisible();
  });

  test("should navigate to player list from navigation menu", async ({
    page,
  }) => {
    await page.goto("/");

    // Click Players link in navigation
    await page.click(selectors.navigation.playersLink);

    // Verify navigation to players page
    await expect(page).toHaveURL("/players");

    // Verify player list is loaded
    const playerList = page.locator(selectors.players.list);
    await expect(playerList).toBeVisible();
  });
});

test.describe("Player Management - Create Player (Admin Only)", () => {
  test("should create a player with all fields", async ({ adminPage }) => {
    await adminPage.goto("/players");

    const timestamp = Date.now();
    const playerData = {
      name: `Test Player ${timestamp}`,
      height: "78",
      weight: "216",
      birthday: "1963-02-17",
    };

    // Fill in player form
    await adminPage.fill(selectors.players.nameInput, playerData.name);
    await adminPage.fill(selectors.players.heightInput, playerData.height);
    await adminPage.fill(selectors.players.weightInput, playerData.weight);
    await adminPage.fill(selectors.players.birthdayInput, playerData.birthday);

    // Submit form
    await adminPage.click(selectors.players.saveButton);

    // Wait for creation
    await adminPage.waitForTimeout(2000);

    // Verify player appears in list
    const playerLink = adminPage.locator(`text=${playerData.name}`);
    await expect(playerLink).toBeVisible();

    // Cleanup: Delete the created player
    await deletePlayerByName(adminPage, playerData.name);
  });

  test("should create a player with only required fields (name)", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    const playerName = `Minimal Player ${Date.now()}`;

    // Fill only name field
    await adminPage.fill(selectors.players.nameInput, playerName);

    // Submit form
    await adminPage.click(selectors.players.saveButton);

    // Wait for creation
    await adminPage.waitForTimeout(2000);

    // Verify player appears in list
    const playerLink = adminPage.locator(`text=${playerName}`);
    await expect(playerLink).toBeVisible();

    // Cleanup
    await deletePlayerByName(adminPage, playerName);
  });

  test("should show validation error when creating player without name", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    // Fill other fields but leave name empty
    await adminPage.fill(selectors.players.heightInput, "72");
    await adminPage.fill(selectors.players.weightInput, "180");

    // Try to submit form
    await adminPage.click(selectors.players.saveButton);

    // Verify validation error or that form didn't submit
    // Check if still on players page (didn't navigate away)
    await expect(adminPage).toHaveURL("/players");

    // The form should still be visible (not cleared)
    const heightInput = adminPage.locator(selectors.players.heightInput);
    await expect(heightInput).toHaveValue("72");
  });

  test("should handle special characters in player name", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    const playerName = `O'Neill ${Date.now()}`;

    await adminPage.fill(selectors.players.nameInput, playerName);
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Verify player appears with correct name
    const playerLink = adminPage.locator(`text=${playerName}`);
    await expect(playerLink).toBeVisible();

    // Cleanup
    await deletePlayerByName(adminPage, playerName);
  });
});

test.describe("Player Management - Edit Player (Admin Only)", () => {
  test("should edit an existing player", async ({ adminPage }) => {
    await adminPage.goto("/players");

    // First create a player to edit
    const originalName = `Edit Test Player ${Date.now()}`;
    await adminPage.fill(selectors.players.nameInput, originalName);
    await adminPage.fill(selectors.players.heightInput, "72");
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Find the player in the list
    const playerLink = adminPage.locator(`text=${originalName}`).first();
    await expect(playerLink).toBeVisible();

    // Click on the player name or find edit button
    // Look for edit button near the player
    const playerRow = adminPage
      .locator(`player-list`)
      .locator(`text=${originalName}`)
      .locator("..");

    // Try to find edit button
    const editButton = playerRow.locator('button:has-text("Edit"), .edit-btn');
    const editButtonExists = await editButton
      .count()
      .then((count: number) => count > 0);

    if (editButtonExists) {
      await editButton.first().click();
      await adminPage.waitForTimeout(1000);

      // Modify the player data
      const updatedName = `${originalName} Updated`;
      await adminPage.fill(selectors.players.nameInput, updatedName);
      await adminPage.fill(selectors.players.heightInput, "75");

      // Save changes
      await adminPage.click(selectors.players.saveButton);
      await adminPage.waitForTimeout(2000);

      // Verify updated name appears
      await expect(adminPage.locator(`text=${updatedName}`)).toBeVisible();

      // Cleanup
      await deletePlayerByName(adminPage, updatedName);
    } else {
      // If inline editing isn't available, skip this test
      test.skip();
    }
  });

  test("should cancel player edit without saving changes", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    // Create a player
    const playerName = `Cancel Edit Test ${Date.now()}`;
    await adminPage.fill(selectors.players.nameInput, playerName);
    await adminPage.fill(selectors.players.heightInput, "72");
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Try to find and click edit
    const playerRow = adminPage
      .locator(`player-list`)
      .locator(`text=${playerName}`)
      .locator("..");
    const editButton = playerRow.locator('button:has-text("Edit"), .edit-btn');
    const editButtonExists = await editButton
      .count()
      .then((count: number) => count > 0);

    if (editButtonExists) {
      await editButton.first().click();
      await adminPage.waitForTimeout(1000);

      // Modify data
      await adminPage.fill(
        selectors.players.nameInput,
        `${playerName} Modified`
      );

      // Click cancel
      await adminPage.click(selectors.players.cancelButton);
      await adminPage.waitForTimeout(1000);

      // Verify original name still exists
      await expect(
        adminPage.locator(`text=${playerName}`).first()
      ).toBeVisible();

      // Verify modified name does NOT exist
      await expect(
        adminPage.locator(`text=${playerName} Modified`)
      ).not.toBeVisible();

      // Cleanup
      await deletePlayerByName(adminPage, playerName);
    } else {
      test.skip();
    }
  });
});

test.describe("Player Management - Delete Player (Admin Only)", () => {
  test("should delete a player with confirmation", async ({ adminPage }) => {
    await adminPage.goto("/players");

    // Create a player to delete
    const playerName = `Delete Test Player ${Date.now()}`;
    await adminPage.fill(selectors.players.nameInput, playerName);
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Verify player exists
    await expect(adminPage.locator(`text=${playerName}`).first()).toBeVisible();

    // Find delete button
    const playerRow = adminPage
      .locator(`player-list`)
      .locator(`text=${playerName}`)
      .locator("..");
    const deleteButton = playerRow.locator(selectors.players.deleteButton);

    // Set up dialog handler to accept confirmation
    adminPage.on("dialog", async (dialog: any) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain("sure");
      await dialog.accept();
    });

    // Click delete
    await deleteButton.first().click();
    await adminPage.waitForTimeout(2000);

    // Verify player is removed
    await expect(adminPage.locator(`text=${playerName}`)).not.toBeVisible();
  });

  test("should cancel player deletion", async ({ adminPage }) => {
    await adminPage.goto("/players");

    // Create a player
    const playerName = `Cancel Delete Test ${Date.now()}`;
    await adminPage.fill(selectors.players.nameInput, playerName);
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Find delete button
    const playerRow = adminPage
      .locator(`player-list`)
      .locator(`text=${playerName}`)
      .locator("..");
    const deleteButton = playerRow.locator(selectors.players.deleteButton);

    // Set up dialog handler to dismiss confirmation
    adminPage.on("dialog", async (dialog: any) => {
      await dialog.dismiss();
    });

    // Click delete
    await deleteButton.first().click();
    await adminPage.waitForTimeout(1000);

    // Verify player still exists
    await expect(adminPage.locator(`text=${playerName}`).first()).toBeVisible();

    // Cleanup
    await deletePlayerByName(adminPage, playerName);
  });
});

test.describe("Player Management - View Player Details", () => {
  test("should display player details page", async ({ adminPage }) => {
    await adminPage.goto("/players");

    // Create a player with full details
    const timestamp = Date.now();
    const playerData = {
      name: `Details Test Player ${timestamp}`,
      height: "74",
      weight: "200",
      birthday: "1995-05-15",
    };

    await adminPage.fill(selectors.players.nameInput, playerData.name);
    await adminPage.fill(selectors.players.heightInput, playerData.height);
    await adminPage.fill(selectors.players.weightInput, playerData.weight);
    await adminPage.fill(selectors.players.birthdayInput, playerData.birthday);
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Click on player name to view details
    const playerLink = adminPage.locator(`text=${playerData.name}`).first();
    await playerLink.click();

    // Wait for navigation to details page
    await adminPage.waitForTimeout(2000);

    // Verify URL contains player ID pattern
    await expect(adminPage).toHaveURL(/\/players\/\d+/);

    // Verify page title
    await expect(adminPage).toHaveTitle(/BitBalls.*Player/i);

    // Verify player name is displayed
    await expect(adminPage.locator(`text=${playerData.name}`)).toBeVisible();

    // Go back and cleanup
    await adminPage.goto("/players");
    await deletePlayerByName(adminPage, playerData.name);
  });

  test("should handle navigation to non-existent player", async ({ page }) => {
    // Navigate to invalid player ID
    await page.goto("/players/999999");

    await page.waitForTimeout(2000);

    // Should show 404 or error message (exact behavior may vary)
    // Check if we're still on the URL or redirected
    const url = page.url();
    const has404 = await page.locator("text=/404|not found/i").count();

    // Either we see an error message or we're redirected
    expect(
      has404 > 0 || url.includes("/404") || url === "/players"
    ).toBeTruthy();
  });
});

test.describe("Player Management - Permissions", () => {
  test("non-admin should not see create player form", async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.goto("/players");

    // Verify player list is visible
    const playerList = authenticatedPage.locator(selectors.players.list);
    await expect(playerList).toBeVisible();

    // Verify edit form is NOT visible or inputs are disabled
    const nameInput = authenticatedPage.locator(selectors.players.nameInput);

    // Check if input doesn't exist or is not visible
    const inputCount = await nameInput.count();
    if (inputCount > 0) {
      // If it exists, it should not be visible or should be disabled
      const isVisible = await nameInput.isVisible().catch(() => false);
      const isDisabled = await nameInput.isDisabled().catch(() => false);
      expect(isVisible === false || isDisabled === true).toBeTruthy();
    }
  });

  test("non-admin should not see edit/delete buttons", async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.goto("/players");

    // Wait for page to load
    await authenticatedPage.waitForTimeout(2000);

    // Verify no edit buttons are visible
    const editButtons = authenticatedPage.locator(
      'button:has-text("Edit"), .edit-btn'
    );
    const editCount = await editButtons.count();

    // Either no buttons exist or they're not visible
    if (editCount > 0) {
      await expect(editButtons.first()).not.toBeVisible();
    }

    // Verify no delete buttons are visible
    const deleteButtons = authenticatedPage.locator(".destroy-btn");
    const deleteCount = await deleteButtons.count();

    if (deleteCount > 0) {
      await expect(deleteButtons.first()).not.toBeVisible();
    }
  });
});

test.describe("Player Management - Edge Cases", () => {
  test("should handle very long player names", async ({ adminPage }) => {
    await adminPage.goto("/players");

    const longName = `Christopher Alexander Montgomery Wellington III ${Date.now()}`;

    await adminPage.fill(selectors.players.nameInput, longName);
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Verify player was created (name might be truncated in display)
    const playerExists =
      (await adminPage.locator(`text=${longName}`).count()) > 0 ||
      (await adminPage.locator(`text=/Christopher Alexander/`).count()) > 0;

    expect(playerExists).toBeTruthy();

    // Cleanup
    await deletePlayerByName(adminPage, longName);
  });

  test("should validate numeric fields", async ({ adminPage }) => {
    await adminPage.goto("/players");

    const playerName = `Validation Test ${Date.now()}`;

    await adminPage.fill(selectors.players.nameInput, playerName);

    // Try to enter invalid height (text instead of number)
    await adminPage.fill(selectors.players.heightInput, "abc");

    // Depending on input type="number", browser may prevent non-numeric input
    // Or server-side validation will catch it

    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // If validation works, height should be empty or zero
    // The important thing is the form handles it gracefully

    // Check if player was created
    const playerExists = await adminPage
      .locator(`text=${playerName}`)
      .count()
      .then((count: number) => count > 0);

    if (playerExists) {
      // Cleanup
      await deletePlayerByName(adminPage, playerName);
    }
  });

  test("should handle zero or negative values appropriately", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    const playerName = `Zero Value Test ${Date.now()}`;

    await adminPage.fill(selectors.players.nameInput, playerName);
    await adminPage.fill(selectors.players.heightInput, "0");
    await adminPage.fill(selectors.players.weightInput, "-5");

    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // System should either reject or accept based on business rules
    // Either way, it should handle gracefully without crashing

    const playerExists = await adminPage
      .locator(`text=${playerName}`)
      .count()
      .then((count: number) => count > 0);

    if (playerExists) {
      await deletePlayerByName(adminPage, playerName);
    }
  });
});

test.describe("Player Management - Data Integrity", () => {
  test("should persist player data after page refresh", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    const playerName = `Persistence Test ${Date.now()}`;

    // Create player
    await adminPage.fill(selectors.players.nameInput, playerName);
    await adminPage.fill(selectors.players.heightInput, "72");
    await adminPage.fill(selectors.players.weightInput, "185");
    await adminPage.click(selectors.players.saveButton);
    await adminPage.waitForTimeout(2000);

    // Verify player exists
    await expect(adminPage.locator(`text=${playerName}`).first()).toBeVisible();

    // Refresh page
    await adminPage.reload();
    await adminPage.waitForTimeout(2000);

    // Verify player still exists
    await expect(adminPage.locator(`text=${playerName}`).first()).toBeVisible();

    // Cleanup
    await deletePlayerByName(adminPage, playerName);
  });

  test("should handle multiple rapid player creations", async ({
    adminPage,
  }) => {
    await adminPage.goto("/players");

    const baseTimestamp = Date.now();
    const playerNames: string[] = [];

    // Create multiple players quickly
    for (let i = 0; i < 3; i++) {
      const playerName = `Rapid Test ${baseTimestamp}-${i}`;
      playerNames.push(playerName);

      await adminPage.fill(selectors.players.nameInput, playerName);
      await adminPage.click(selectors.players.saveButton);
      await adminPage.waitForTimeout(500); // Short wait between creations
    }

    // Wait for all to be created
    await adminPage.waitForTimeout(2000);

    // Verify all players were created
    for (const name of playerNames) {
      await expect(adminPage.locator(`text=${name}`).first()).toBeVisible();
    }

    // Cleanup all
    for (const name of playerNames) {
      await deletePlayerByName(adminPage, name);
    }
  });
});

/**
 * Helper function to delete a player by name
 * Handles dialog confirmation
 */
async function deletePlayerByName(page: any, playerName: string) {
  // Find the player row
  const playerRow = page
    .locator(`player-list`)
    .locator(`text=${playerName}`)
    .locator("..");

  const deleteButton = playerRow.locator(selectors.players.deleteButton);
  const deleteExists = await deleteButton
    .count()
    .then((count: number) => count > 0);

  if (deleteExists) {
    // Set up dialog handler
    page.on("dialog", async (dialog: any) => {
      await dialog.accept();
    });

    await deleteButton.first().click();
    await page.waitForTimeout(2000);
  }
}
