# Playwright Quick Reference

## Setup (One-time)

```bash
cd e2e-test-flows
npm install
npx playwright install
```

## Before Running Tests

```bash
# Start the app (from project root)
cd ..
docker-compose up -d
```

## Running Tests

**Note**: Test users are automatically created before tests run and deleted after. See [SETUP-TEARDOWN.md](./SETUP-TEARDOWN.md) for details.

```bash
cd e2e-test-flows

# Run all tests (includes automatic setup/teardown)
npm test

# Run in UI mode (recommended for development)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Run specific test file
npx playwright test tests/example.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Debug a test
npm run test:debug

# View test report
npm run test:report
```

## Code Generation

```bash
# Generate test code by recording actions
npm run test:codegen
```

## Useful Playwright Commands

```bash
# Show available browsers
npx playwright --version

# Update Playwright
npm install @playwright/test@latest

# Clear test cache
rm -rf test-results/ playwright-report/
```

## File Structure

```
e2e-test-flows/
├── tests/              # Your test files go here
├── fixtures/           # Reusable test fixtures (auth, etc.)
├── helpers/            # Page objects and utilities
├── playwright.config.ts # Playwright configuration
└── README-SETUP.md     # Full documentation
```

## Writing Tests

### Basic Test

```typescript
import { test, expect } from "@playwright/test";

test("my test", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/BitBalls/);
});
```

### Using Fixtures

```typescript
import { test, expect } from "../fixtures/auth.fixture";

test("admin test", async ({ adminPage }) => {
  await adminPage.goto("/tournaments");
  // Already authenticated as admin
});
```

### Using Helpers

```typescript
import { test, expect } from "@playwright/test";
import { helpers, selectors } from "../helpers/page-objects";

test("create tournament", async ({ page }) => {
  await helpers.login(page, "admin@test.com", "pass");
  await helpers.createTournament(page, "Test", "2024-01-01");
});
```

## Common Assertions

```typescript
// Visibility
await expect(page.locator(".my-element")).toBeVisible();
await expect(page.locator(".my-element")).toBeHidden();

// Text content
await expect(page.locator(".my-element")).toHaveText("Expected");
await expect(page.locator(".my-element")).toContainText("Part");

// Count
await expect(page.locator(".item")).toHaveCount(5);

// URL
await expect(page).toHaveURL("/tournaments");
await expect(page).toHaveURL(/tournaments\/\d+/);

// Title
await expect(page).toHaveTitle("BitBalls | Tournaments");

// Attributes
await expect(page.locator("button")).toBeEnabled();
await expect(page.locator("button")).toBeDisabled();
await expect(page.locator("input")).toHaveValue("text");
```

## Common Actions

```typescript
// Navigation
await page.goto("/tournaments");
await page.goBack();
await page.goForward();
await page.reload();

// Clicking
await page.click("button");
await page.locator("button").click();
await page.locator("button").click({ force: true }); // Force click

// Typing
await page.fill('input[name="email"]', "test@example.com");
await page.type("input", "text", { delay: 100 }); // Slower typing

// Selecting
await page.selectOption("select", "value");
await page.selectOption("select", { label: "Option Text" });

// Waiting
await page.waitForSelector(".element");
await page.waitForLoadState("networkidle");
await page.waitForTimeout(1000); // Avoid if possible

// Screenshots
await page.screenshot({ path: "screenshot.png" });
await page.locator(".element").screenshot({ path: "element.png" });
```

## Debugging Tips

1. **Use test.only()** to run single test:

   ```typescript
   test.only('my test', async ({ page }) => { ... });
   ```

2. **Use page.pause()** to pause execution:

   ```typescript
   await page.goto("/");
   await page.pause(); // Opens Playwright Inspector
   ```

3. **Run with --debug flag**:

   ```bash
   npx playwright test --debug
   ```

4. **Use headed mode** to see browser:

   ```bash
   npm run test:headed
   ```

5. **Check screenshots/videos** in `test-results/` after failure

6. **Use UI mode** for interactive debugging:
   ```bash
   npm run test:ui
   ```

## Flow Documents Reference

- [Authentication Flow](./01-authentication-flow.md)
- [Player Management](./02-player-management-flow.md)
- [Game Details](./03-game-details-flow.md)
- [Tournament Management](./04-tournament-management-flow.md)
- [Navigation & Routing](./05-navigation-and-routing-flow.md)

## Troubleshooting

**Can't connect to app**: Ensure Docker is running `docker-compose ps`

**Lint errors**: Run `npm install` to install dependencies

**Tests timing out**: Increase timeout in `playwright.config.ts`

**Flaky tests**: Add proper waits, avoid `waitForTimeout`

## More Information

- Full setup guide: [README-SETUP.md](./README-SETUP.md)
- Playwright docs: https://playwright.dev/
