# E2E Test Environment Setup

This directory contains a standalone Playwright test environment for the Bitballs application.

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Bitballs application running via Docker on port 5001

## Installation

1. **Install dependencies:**

   ```bash
   cd e2e-test-flows
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running the Application

Before running tests, ensure the Bitballs application is running:

```bash
# From the project root directory
docker-compose up
```

The application should be accessible at: http://localhost:5001

## Test Setup and Teardown

The test suite includes **automatic user management**:

- **Global Setup**: Creates admin and regular test users before tests run
- **Global Teardown**: Deletes test users after all tests complete

See [SETUP-TEARDOWN.md](./SETUP-TEARDOWN.md) for detailed documentation.

**Important**: Test users are automatically created when you run `npm test`. You don't need to manually create users in the application.

## Running Tests

### Basic Commands

```bash
# Run all tests (includes setup and teardown)
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# View test report
npm run test:report

# Generate test code using Codegen
npm run test:codegen
```

### Run Specific Tests

```bash
# Run a specific test file
npx playwright test tests/authentication.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debugging Tests

```bash
# Debug a specific test
npx playwright test tests/authentication.spec.ts --debug

# Run with UI mode for interactive debugging
npm run test:ui
```

## Project Structure

```
e2e-test-flows/
├── tests/                      # Test files (*.spec.ts, *.test.ts)
│   └── .gitkeep
├── fixtures/                   # Reusable test fixtures
│   └── auth.fixture.ts        # Authentication fixtures
├── playwright-report/         # HTML test reports (generated)
├── test-results/              # Test artifacts (generated)
├── package.json               # Node.js dependencies
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── .gitignore                # Git ignore patterns
└── README-SETUP.md           # This file
```

## Configuration

### playwright.config.ts

Key configuration options:

- **baseURL**: `http://localhost:5001` - Points to Docker container
- **testDir**: `./tests` - Test files location
- **fullyParallel**: `true` - Run tests in parallel
- **retries**: CI retries failed tests twice
- **reporter**: HTML and list reporters
- **projects**: Configured for Chromium, Firefox, WebKit, and mobile viewports

### Browser Projects

The following test projects are configured:

- ✅ **chromium** - Desktop Chrome
- ✅ **firefox** - Desktop Firefox
- ✅ **webkit** - Desktop Safari
- ✅ **Mobile Chrome** - Pixel 5 viewport
- ✅ **Mobile Safari** - iPhone 12 viewport

To run a specific project:

```bash
npx playwright test --project=chromium
```

## Writing Tests

### Basic Test Structure

Create a new test file in the `tests/` directory:

```typescript
// tests/example.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    // Add test steps
    await expect(page).toHaveTitle(/BitBalls/);
  });
});
```

### Using Authentication Fixtures

For tests requiring authentication:

```typescript
// tests/admin-feature.spec.ts
import { test, expect } from "../fixtures/auth.fixture";

test.describe("Admin Features", () => {
  test("should access admin panel", async ({ adminPage }) => {
    await adminPage.goto("/tournaments");
    // adminPage is already authenticated as admin
  });
});
```

### Test Organization

Organize tests by feature area to match the flow documents:

- `tests/auth/` - Authentication tests (01-authentication-flow.md)
- `tests/players/` - Player management tests (02-player-management-flow.md)
- `tests/games/` - Game details tests (03-game-details-flow.md)
- `tests/tournaments/` - Tournament tests (04-tournament-management-flow.md)
- `tests/navigation/` - Navigation tests (05-navigation-and-routing-flow.md)

## Test Data

### Test Users

You'll need to create test users in the application:

- **Regular User**: `user@example.com` / `password123`
- **Admin User**: `admin@bitballs.com` / `adminpass123`

Create these users via the registration page or database seeding before running tests.

### Database Reset

For consistent test runs, you may need to reset the database:

```bash
# Stop containers and remove volumes
docker-compose down -v

# Restart with fresh database
docker-compose up
```

## Continuous Integration

### CI Configuration Example

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Start application
        run: docker-compose up -d

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        working-directory: e2e-test-flows
        run: npm ci

      - name: Install Playwright browsers
        working-directory: e2e-test-flows
        run: npx playwright install --with-deps

      - name: Wait for application
        run: npx wait-on http://localhost:5001

      - name: Run tests
        working-directory: e2e-test-flows
        run: npm test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: e2e-test-flows/playwright-report/
```

## Troubleshooting

### Application Not Running

**Error**: `Error: page.goto: net::ERR_CONNECTION_REFUSED`

**Solution**: Ensure Docker containers are running:

```bash
docker-compose ps
# Should show bitballs-app-1 as "Up"
```

### Port Already in Use

**Error**: Port 5001 is already allocated

**Solution**: Stop other services using that port or change the port in docker-compose.yml

### Playwright Browsers Not Installed

**Error**: `Executable doesn't exist at /path/to/browser`

**Solution**: Install Playwright browsers:

```bash
npx playwright install
```

### Slow Test Execution

**Issue**: Tests running slowly

**Solutions**:

- Disable parallelization: `npx playwright test --workers=1`
- Run specific browser: `npx playwright test --project=chromium`
- Check Docker resource allocation

### Authentication Issues

**Issue**: Login not working in tests

**Solutions**:

- Verify test user credentials exist in database
- Check session cookie settings
- Verify application is running correctly

## Best Practices

1. **Use Page Objects**: Create reusable page object models for complex pages
2. **Use Fixtures**: Leverage fixtures for authentication and common setup
3. **Independent Tests**: Each test should be independent and not rely on others
4. **Clean Up**: Reset state between tests when necessary
5. **Meaningful Assertions**: Use descriptive expect messages
6. **Wait Properly**: Use Playwright's auto-waiting, avoid arbitrary timeouts
7. **Screenshot on Failure**: Configured automatically for debugging
8. **Organize by Feature**: Follow the structure of the flow documents

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Bitballs Flow Documents](./README.md)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)

## Support

For issues or questions:

- Check Playwright documentation
- Review the flow documents in this directory
- Check application logs: `docker-compose logs app`
- Open an issue in the Bitballs repository
