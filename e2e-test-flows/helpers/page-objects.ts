/**
 * Page Object Model Helpers
 *
 * This file provides reusable selectors and helper functions for interacting
 * with the Bitballs application in tests.
 *
 * Usage:
 *   import { selectors, helpers } from '../helpers/page-objects';
 *   await page.locator(selectors.navigation.logo).click();
 */

/**
 * Common selectors for the Bitballs application
 * Based on the component structure documented in the flow documents
 */
export const selectors = {
  navigation: {
    container: "bitballs-navigation",
    logo: 'bitballs-navigation a[href="/"]',
    tournamentsLink: 'bitballs-navigation a[href="/tournaments"]',
    playersLink: 'bitballs-navigation a[href="/players"]',
    usersLink: 'bitballs-navigation a[href="/users"]',
    sessionDropdown: "bitballs-navigation .session-menu",
    logoutButton: 'bitballs-navigation button:has-text("Logout")',
  },

  auth: {
    loginForm: "bitballs-navigation form",
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button:has-text("Login")',
    registerLink: 'a[href="/register"]',
  },

  tournaments: {
    list: "tournament-list",
    createForm: "tournament-list form",
    nameInput: 'input[name="name"]',
    dateInput: 'input[name="date"]',
    createButton: 'button:has-text("Create Tournament")',
    deleteButton: ".destroy-btn",
    tournamentLink: (id: number) => `a[href="/tournaments/${id}"]`,
  },

  players: {
    list: "player-list",
    editForm: "player-edit",
    nameInput: 'input[name="name"]',
    heightInput: 'input[name="height"]',
    weightInput: 'input[name="weight"]',
    birthdayInput: 'input[name="birthday"]',
    saveButton: 'button:has-text("Save")',
    cancelButton: 'button:has-text("Cancel")',
    deleteButton: ".destroy-btn",
    playerLink: (id: number) => `a[href="/players/${id}"]`,
  },

  games: {
    details: "game-details",
    youtubePlayer: "#youtube-player",
    statsContainer: ".stats-container",
    statMarker: ".stat-marker",
    timeCursor: ".time-cursor",
    currentScore: ".current-score",
    finalScore: ".final-score",
    deleteStatButton: ".destroy-btn",
  },

  teams: {
    createForm: "form", // More specific selector needed based on context
    colorSelect: 'select[name="color"]',
    player1Select: 'select[name="player1Id"]',
    player2Select: 'select[name="player2Id"]',
    player3Select: 'select[name="player3Id"]',
    player4Select: 'select[name="player4Id"]',
    createButton: 'button:has-text("Create Team")',
  },
};

/**
 * Helper functions for common test operations
 */
export const helpers = {
  /**
   * Login as a user
   */
  async login(page: any, email: string, password: string) {
    await page.click(selectors.navigation.sessionDropdown);
    await page.fill(selectors.auth.emailInput, email);
    await page.fill(selectors.auth.passwordInput, password);
    await page.click(selectors.auth.loginButton);
    // Wait for navigation or session to be established
    await page.waitForTimeout(1000); // Replace with proper wait condition
  },

  /**
   * Logout current user
   */
  async logout(page: any) {
    await page.click(selectors.navigation.sessionDropdown);
    await page.click(selectors.navigation.logoutButton);
  },

  /**
   * Navigate to a specific route
   */
  async navigateTo(page: any, path: string) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  },

  /**
   * Wait for a component to be visible
   */
  async waitForComponent(page: any, selector: string) {
    await page.waitForSelector(selector, { state: "visible" });
  },

  /**
   * Check if user is logged in
   */
  async isLoggedIn(page: any): Promise<boolean> {
    const logoutButton = await page.locator(selectors.navigation.logoutButton);
    return await logoutButton.isVisible().catch(() => false);
  },

  /**
   * Create a tournament (admin only)
   */
  async createTournament(page: any, name: string, date: string) {
    await page.fill(selectors.tournaments.nameInput, name);
    await page.fill(selectors.tournaments.dateInput, date);
    await page.click(selectors.tournaments.createButton);
    await page.waitForTimeout(1000); // Replace with proper wait condition
  },

  /**
   * Create a player (admin only)
   */
  async createPlayer(
    page: any,
    playerData: {
      name: string;
      height?: number;
      weight?: number;
      birthday?: string;
    }
  ) {
    await page.fill(selectors.players.nameInput, playerData.name);
    if (playerData.height) {
      await page.fill(selectors.players.heightInput, String(playerData.height));
    }
    if (playerData.weight) {
      await page.fill(selectors.players.weightInput, String(playerData.weight));
    }
    if (playerData.birthday) {
      await page.fill(selectors.players.birthdayInput, playerData.birthday);
    }
    await page.click(selectors.players.saveButton);
    await page.waitForTimeout(1000); // Replace with proper wait condition
  },
};

/**
 * Test data generators
 */
export const testData = {
  users: {
    admin: {
      email: "admin@bitballs.com",
      password: "adminpass123",
    },
    regular: {
      email: "user@example.com",
      password: "password123",
    },
  },

  randomEmail: () => `test-${Date.now()}@example.com`,

  randomTournamentName: () => `Test Tournament ${Date.now()}`,

  randomPlayerName: () => `Test Player ${Date.now()}`,

  samplePlayer: () => ({
    name: `Player ${Date.now()}`,
    height: 72,
    weight: 180,
    birthday: "1990-01-01",
  }),
};
