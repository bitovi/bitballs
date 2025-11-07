import { Page, Locator, expect } from '@playwright/test';

export class TournamentPage {
  readonly page: Page;
  readonly createTournamentForm: Locator;
  readonly tournamentDateInput: Locator;
  readonly submitButton: Locator;
  readonly tournamentList: Locator;
  readonly deleteButton: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createTournamentForm = page.locator('.tournament-form, form[action*="tournament"]');
    this.tournamentDateInput = page.locator('input[name="date"], input[type="date"]');
    this.submitButton = page.locator('button[type="submit"], .submit-btn');
    this.tournamentList = page.locator('.tournament-list, .tournaments');
    this.deleteButton = page.locator('.delete-btn, button:has-text("Delete")');
    this.editButton = page.locator('.edit-btn, button:has-text("Edit")');
  }

  async navigateToTournaments() {
    await this.page.goto('/tournaments');
    await expect(this.tournamentList).toBeVisible();
  }

  async createTournament(date: string) {
    await this.tournamentDateInput.fill(date);
    await this.submitButton.click();
  }

  async expectTournamentCreated(year: string) {
    await expect(this.tournamentList).toContainText(year);
  }

  async expectTournamentFormVisible() {
    await expect(this.createTournamentForm).toBeVisible();
  }

  async expectTournamentFormNotVisible() {
    await expect(this.createTournamentForm).not.toBeVisible();
  }

  async clickFirstTournament() {
    await this.tournamentList.locator('.tournament:first-child a, .tournament-item:first-child a').click();
  }

  async expectTournamentDetails() {
    await expect(this.page.locator('h1, .tournament-title')).toBeVisible();
  }
}