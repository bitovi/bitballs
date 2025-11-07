import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for Bitballs app testing
 * 
 * The app runs in a Docker container and is accessible at http://localhost:5001
 */
export default defineConfig({
  // Test directory (create tests/ folder to add your tests)
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for the application
    baseURL: 'http://localhost:5001',    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure
    video: "retain-on-failure",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // Mobile viewports
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Web server configuration
  // This will wait for the app to be ready before running tests
  webServer: {
    command: 'echo "App should already be running via docker-compose"',
    url: 'http://localhost:5001',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
