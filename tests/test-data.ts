// Test data helpers for BitBalls application

export interface TestUser {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface TestTournament {
  date: string;
  year: number;
}

export interface TestPlayer {
  name: string;
  number?: number;
}

export interface TestTeam {
  color: string;
  players: TestPlayer[];
}

export const TEST_USERS: Record<string, TestUser> = {
  admin: {
    email: 'admin@bitballs.com',
    password: 'password',
    isAdmin: true
  },
  user: {
    email: 'user@bitballs.com',
    password: 'password',
    isAdmin: false
  }
};

export const TEST_TOURNAMENTS: TestTournament[] = [
  { date: '2024-01-15', year: 2024 },
  { date: '2023-12-20', year: 2023 }
];

export const TEST_PLAYERS: TestPlayer[] = [
  { name: 'John Doe', number: 1 },
  { name: 'Jane Smith', number: 2 },
  { name: 'Mike Johnson', number: 3 },
  { name: 'Sarah Wilson', number: 4 }
];

export const TEST_TEAMS: TestTeam[] = [
  {
    color: 'Red',
    players: TEST_PLAYERS.slice(0, 2)
  },
  {
    color: 'Blue', 
    players: TEST_PLAYERS.slice(2, 4)
  }
];

// Helper functions for test data management
export async function seedTestData() {
  // Implementation would depend on your database setup
  console.log('Seeding test data...');
}

export async function cleanupTestData() {
  // Implementation would depend on your database setup
  console.log('Cleaning up test data...');
}

export async function resetDatabase() {
  // Implementation would depend on your database setup
  console.log('Resetting database...');
}