import { Page, Locator, expect } from '@playwright/test';

export class PlayerPage {
  readonly page: Page;
  readonly playerList: Locator;
  readonly createPlayerForm: Locator;
  readonly playerNameInput: Locator;
  readonly submitButton: Locator;
  readonly deleteButton: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playerList = page.locator('.player-list, .players');
    this.createPlayerForm = page.locator('.player-form, form[action*="player"]');
    this.playerNameInput = page.locator('input[name="name"], input[placeholder*="name"]');
    this.submitButton = page.locator('button[type="submit"], .submit-btn');
    this.deleteButton = page.locator('.delete-btn, button:has-text("Delete")');
    this.editButton = page.locator('.edit-btn, button:has-text("Edit")');
  }

  async navigateToPlayers() {
    await this.page.goto('/players');
    await expect(this.playerList).toBeVisible();
  }

  async createPlayer(name: string) {
    await this.playerNameInput.fill(name);
    await this.submitButton.click();
  }

  async expectPlayerCreated(name: string) {
    await expect(this.playerList).toContainText(name);
  }

  async expectPlayerFormVisible() {
    await expect(this.createPlayerForm).toBeVisible();
  }

  async expectPlayerFormNotVisible() {
    await expect(this.createPlayerForm).not.toBeVisible();
  }

  async clickFirstPlayer() {
    await this.playerList.locator('.player:first-child a, .player-item:first-child a').click();
  }

  async expectPlayerDetails() {
    await expect(this.page.locator('h1, .player-title')).toBeVisible();
  }

  async expectPlayerStats() {
    await expect(this.page.locator('.stats, .player-stats')).toBeVisible();
  }
}