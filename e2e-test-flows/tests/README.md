# E2E Test Suite

## Test Files

### `player-management.spec.ts`

Comprehensive E2E tests for Player Management functionality based on `02-player-management-flow.md`.

**Test Coverage:**

- ✅ Player List View (Admin & Non-Admin)
- ✅ Create New Player (Admin Only)
- ✅ Edit Existing Player (Admin Only)
- ✅ Delete Player (Admin Only)
- ✅ View Player Details
- ✅ Permissions Testing (Admin vs Non-Admin)
- ✅ Form Validation
- ✅ Edge Cases (special characters, long names, invalid data)
- ✅ Data Integrity & Persistence

**Test Groups:**

1. **Player List View** - Display and navigation tests
2. **Create Player** - New player creation with validation
3. **Edit Player** - Update existing players and cancel editing
4. **Delete Player** - Deletion with confirmation/cancellation
5. **View Player Details** - Individual player pages and invalid IDs
6. **Permissions** - Admin vs Non-Admin access controls
7. **Edge Cases** - Special characters, long names, invalid values
8. **Data Integrity** - Persistence and concurrent operations

## Running Tests

### Run All Player Management Tests

```bash
npx playwright test player-management
```

### Run Specific Test Group

```bash
# Run only create player tests
npx playwright test player-management -g "Create Player"

# Run only permissions tests
npx playwright test player-management -g "Permissions"

# Run only delete tests
npx playwright test player-management -g "Delete Player"
```

### Run in Different Modes

```bash
# Run in headed mode (see browser)
npx playwright test player-management --headed

# Run in debug mode
npx playwright test player-management --debug

# Run in UI mode (interactive)
npx playwright test player-management --ui

# Run on specific browser
npx playwright test player-management --project=chromium
npx playwright test player-management --project=firefox
```

### Run Single Test

```bash
# Run a specific test by name pattern
npx playwright test player-management -g "should create a player with all fields"
```

## Prerequisites

Before running tests:

1. **Start the Bitballs application**:

   ```bash
   cd /Users/arthur/workspace/bitovi/bitballs
   docker-compose up -d
   ```

2. **Install dependencies** (first time only):

   ```bash
   cd e2e-test-flows
   npm install
   npx playwright install
   ```

3. **Verify app is running**:
   - Navigate to http://localhost:5001
   - Ensure app loads successfully

## Test Behavior

### Automatic User Management

Tests use the **global setup/teardown system**:

- **Before tests**: Admin and regular test users are automatically created
- **During tests**: Tests use these pre-created users via fixtures
- **After tests**: Test users are automatically deleted

### Test Isolation

- Each test that creates data includes cleanup to remove test players
- Tests use unique timestamps in player names to avoid conflicts
- Admin tests use the `adminPage` fixture (auto-login as admin)
- Regular user tests use the `authenticatedPage` fixture

### Test Data

Tests create players with names like:

- `Test Player {timestamp}`
- `Edit Test Player {timestamp}`
- `Delete Test Player {timestamp}`

This ensures test isolation and prevents naming conflicts.

## Test Structure

```typescript
// Using admin fixture
test("admin test", async ({ adminPage }) => {
  // Already logged in as admin
  await adminPage.goto("/players");
  // ... test logic
});

// Using regular user fixture
test("user test", async ({ authenticatedPage }) => {
  // Already logged in as regular user
  await authenticatedPage.goto("/players");
  // ... test logic
});

// Using unauthenticated page
test("public test", async ({ page }) => {
  // No login
  await page.goto("/players");
  // ... test logic
});
```

## Expected Test Results

### Passing Tests

All tests should pass when:

- Application is running on port 5001
- Database is accessible
- Admin functionality is enabled
- Global setup successfully creates test users

### Common Issues

**Tests timeout or fail to connect**:

- Verify Docker containers are running: `docker-compose ps`
- Check app is accessible: `curl http://localhost:5001`

**Login failures**:

- Check `.test-users.json` exists in `e2e-test-flows/`
- Verify global-setup ran successfully

**Player creation fails**:

- Ensure admin user has proper permissions
- Check browser console in headed mode for errors

**Flaky delete tests**:

- Confirmation dialogs may need timing adjustments
- Check if delete buttons use different selectors

## Debugging Tips

### View Test in Browser

```bash
npx playwright test player-management --headed --workers=1
```

### Use Playwright Inspector

```bash
npx playwright test player-management --debug
```

### Generate Test Trace

```bash
npx playwright test player-management --trace on
```

Then view the trace:

```bash
npx playwright show-trace test-results/*/trace.zip
```

### Add Breakpoints

In the test file, add:

```typescript
await page.pause(); // Opens Playwright Inspector
```

### Check Screenshots on Failure

Failed tests automatically capture screenshots in:

```
test-results/
├── player-management-should-create-player/
│   ├── test-failed-1.png
│   └── trace.zip
```

## Extending Tests

### Adding New Tests

1. Follow existing test structure and naming conventions
2. Use fixtures for authentication (`adminPage`, `authenticatedPage`)
3. Clean up created data in the test
4. Use unique identifiers (timestamps) for test data
5. Add descriptive test names

### Example New Test

```typescript
test("should do something new", async ({ adminPage }) => {
  await adminPage.goto("/players");

  const playerName = `New Test ${Date.now()}`;

  // Test logic here...

  // Cleanup
  await deletePlayerByName(adminPage, playerName);
});
```

## Test Metrics

The player management test suite includes:

- **~20 test cases** covering all major flows
- **Test groups**: 8 main describe blocks
- **Coverage**: Create, Read, Update, Delete + Permissions + Edge cases
- **Estimated runtime**: 2-5 minutes (depending on browser and mode)

## Related Documentation

- [Player Management Flow](../02-player-management-flow.md) - Full flow documentation
- [Setup Guide](../README-SETUP.md) - Complete setup instructions
- [Quick Start](../QUICK-START.md) - Quick reference
- [Setup/Teardown](../SETUP-TEARDOWN.md) - User lifecycle management
