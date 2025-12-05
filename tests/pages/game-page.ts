import { Page, Locator, expect } from '@playwright/test';

export class GamePage {
  readonly page: Page;
  readonly gameDetails: Locator;
  readonly videoPlayer: Locator;
  readonly statsSection: Locator;
  readonly scoreBoard: Locator;
  readonly homeTeam: Locator;
  readonly awayTeam: Locator;
  readonly deleteStatButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gameDetails = page.locator('.game-details, .game-info');
    this.videoPlayer = page.locator('.video-player, iframe[src*="youtube"]');
    this.statsSection = page.locator('.stats, .game-stats');
    this.scoreBoard = page.locator('.scoreboard, .score');
    this.homeTeam = page.locator('.home-team');
    this.awayTeam = page.locator('.away-team');
    this.deleteStatButton = page.locator('.delete-stat, button:has-text("Delete")');
  }

  async navigateToGame(gameId: string) {
    await this.page.goto(`/games/${gameId}`);
    await expect(this.gameDetails).toBeVisible();
  }

  async expectGameDetails() {
    await expect(this.gameDetails).toBeVisible();
  }

  async expectVideoPlayer() {
    await expect(this.videoPlayer).toBeVisible();
  }

  async expectStats() {
    await expect(this.statsSection).toBeVisible();
  }

  async expectScoreboard() {
    await expect(this.scoreBoard).toBeVisible();
  }

  async expectTeams() {
    await expect(this.homeTeam).toBeVisible();
    await expect(this.awayTeam).toBeVisible();
  }

  async clickPlayer(playerName: string) {
    await this.page.click(`.player:has-text("${playerName}")`);
  }

  async expectDeleteStatButton() {
    await expect(this.deleteStatButton).toBeVisible();
  }

  async expectNoDeleteStatButton() {
    await expect(this.deleteStatButton).not.toBeVisible();
  }

  async deleteStat() {
    await this.deleteStatButton.first().click();
  }
}