import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Database setup and seeding can be done here
  console.log('Setting up test environment...');
  
  // Example: Reset database to clean state
  // await resetDatabase();
  
  // Example: Seed test data
  // await seedTestData();
  
  // Wait for server to be ready
  const baseURL = config.projects[0]?.use?.baseURL || 'http://localhost:5000';
  
  try {
    const response = await fetch(`${baseURL}/`);
    if (!response.ok) {
      throw new Error(`Server not ready: ${response.status}`);
    }
    console.log('Server is ready for testing');
  } catch (error) {
    console.error('Failed to connect to server:', error);
    throw error;
  }
}

export default globalSetup;