import { test as base, expect } from '@playwright/test';
import { AuthPage } from './pages/auth-page';
import { NavigationPage } from './pages/navigation-page';
import { TournamentPage } from './pages/tournament-page';
import { PlayerPage } from './pages/player-page';
import { GamePage } from './pages/game-page';

// Extend base test to include custom fixtures
export const test = base.extend<{
  authPage: AuthPage;
  navigationPage: NavigationPage;
  tournamentPage: TournamentPage;
  playerPage: PlayerPage;
  gamePage: GamePage;
}>({
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  
  tournamentPage: async ({ page }, use) => {
    await use(new TournamentPage(page));
  },
  
  playerPage: async ({ page }, use) => {
    await use(new PlayerPage(page));
  },
  
  gamePage: async ({ page }, use) => {
    await use(new GamePage(page));
  },
});

export { expect } from '@playwright/test';