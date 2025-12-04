# Test Setup and Teardown

This document explains the global setup and teardown process for the Playwright test suite.

## Overview

The test suite uses global setup and teardown hooks to manage test user lifecycle:

- **Global Setup**: Creates test users before any tests run
- **Global Teardown**: Cleans up test users after all tests complete

## Files

- `global-setup.ts` - Creates admin and regular test users
- `global-teardown.ts` - Deletes the test users
- `.test-users.json` - Temporary file storing user credentials (gitignored)

## Global Setup Process

**File**: `global-setup.ts`

The setup runs **once before all test suites** and performs the following:

1. **Creates Admin User** (first user)

   - Email: `admin-{timestamp}@bitballs-test.com`
   - Password: `TestAdmin123!`
   - First user created is automatically admin in Bitballs

2. **Creates Regular User** (second user)

   - Email: `user-{timestamp}@bitballs-test.com`
   - Password: `TestUser123!`
   - Second user is not admin

3. **Saves Credentials**
   - Credentials saved to `.test-users.json`
   - File used by auth fixtures during tests

### How It Works

```typescript
// In global-setup.ts
async function registerUser(page: Page, email: string, password: string) {
  await page.goto("/register");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="verifyPassword"]', password);
  await page.click('button:has-text("Create Account")');
  // Wait for registration to complete
}
```

The setup:

1. Launches a browser
2. Registers admin user via `/register` page
3. Logs out
4. Registers regular user via `/register` page
5. Logs out
6. Saves credentials to JSON file
7. Closes browser

## Global Teardown Process

**File**: `global-teardown.ts`

The teardown runs **once after all test suites** and performs the following:

1. **Loads Test Users** from `.test-users.json`

2. **Deletes Regular User**

   - Logs in as regular user
   - Deletes user via API (`DELETE /services/users/{id}`)

3. **Deletes Admin User**

   - Logs in as admin user
   - Deletes user via API (`DELETE /services/users/{id}`)

4. **Removes Credentials File**
   - Deletes `.test-users.json`

### How It Works

```typescript
// In global-teardown.ts
async function deleteUserViaAPI(page: Page, email: string) {
  // Get current session to find user ID
  const response = await page.request.get("/services/session");
  const session = await response.json();

  // Delete user via API
  const userId = session.user.id;
  await page.request.delete(`/services/users/${userId}`);
}
```

The teardown:

1. Launches a browser
2. Logs in as regular user
3. Deletes regular user via API
4. Logs in as admin user
5. Deletes admin user via API
6. Removes `.test-users.json` file
7. Closes browser

## Using Test Users in Tests

### Option 1: Using Auth Fixtures (Recommended)

The auth fixtures automatically use the created test users:

```typescript
import { test, expect } from "../fixtures/auth.fixture";

test.describe("Admin Features", () => {
  test("should create tournament", async ({ adminPage }) => {
    // adminPage is already logged in as admin
    await adminPage.goto("/tournaments");
    // ... test code
  });
});

test.describe("User Features", () => {
  test("should view tournaments", async ({ authenticatedPage }) => {
    // authenticatedPage is already logged in as regular user
    await authenticatedPage.goto("/tournaments");
    // ... test code
  });
});
```

### Option 2: Loading Credentials Manually

If you need the credentials directly:

```typescript
import { test, expect } from "@playwright/test";
import { loadTestUsers } from "../global-setup";

test("manual login", async ({ page }) => {
  const testUsers = loadTestUsers();

  await page.goto("/");
  await page.click(".session-menu");
  await page.fill('input[name="email"]', testUsers.admin.email);
  await page.fill('input[name="password"]', testUsers.admin.password);
  await page.click('button:has-text("Login")');
});
```

## Configuration

The setup/teardown is configured in `playwright.config.ts`:

```typescript
export default defineConfig({
  globalSetup: require.resolve("./global-setup.ts"),
  globalTeardown: require.resolve("./global-teardown.ts"),
  // ... other config
});
```

## Test User Credentials Format

The `.test-users.json` file has the following structure:

```json
{
  "admin": {
    "email": "admin-1699999999999@bitballs-test.com",
    "password": "TestAdmin123!"
  },
  "regular": {
    "email": "user-1699999999999@bitballs-test.com",
    "password": "TestUser123!"
  }
}
```

Emails include timestamps to ensure uniqueness across multiple test runs.

## Running Tests

### Normal Test Run

```bash
npm test
```

The flow:

1. **Global Setup** runs → creates users
2. **All tests** run → use the created users
3. **Global Teardown** runs → deletes users

### Debugging Setup/Teardown

If you need to debug the setup or teardown:

```bash
# Run setup only
npx tsx global-setup.ts

# Check if users were created
cat .test-users.json

# Run teardown only
npx tsx global-teardown.ts
```

## Troubleshooting

### Setup Fails

**Problem**: Global setup fails to create users

**Possible Causes**:

- Application not running on port 5001
- Registration page has changed
- Database constraints preventing user creation

**Solutions**:

1. Ensure app is running: `docker-compose ps`
2. Check app is accessible: `curl http://localhost:5001`
3. Review setup logs for specific error
4. Manually test registration at http://localhost:5001/register

### Teardown Fails

**Problem**: Global teardown fails to delete users

**Possible Causes**:

- Users already deleted by a test
- API endpoint for user deletion doesn't exist
- Authentication issues

**Solutions**:

1. Check if `.test-users.json` exists
2. Manually delete users from database if needed
3. Review teardown logs for specific error

**Manual Cleanup**:

```sql
-- Connect to PostgreSQL
DELETE FROM users WHERE email LIKE '%@bitballs-test.com';
```

### Users Not Found in Tests

**Problem**: Tests can't load test users

**Error**: `Test users file not found`

**Causes**:

- Global setup didn't run
- `.test-users.json` was deleted

**Solutions**:

1. Run tests with `npm test` (not individual test files)
2. Check if global setup is configured in `playwright.config.ts`
3. Don't delete `.test-users.json` manually

### Test Users Leak

**Problem**: Test users accumulate in database

**Causes**:

- Tests interrupted before teardown
- Teardown crashes
- Manual test runs

**Solution**: Clean up manually

```sql
DELETE FROM users WHERE email LIKE '%@bitballs-test.com';
```

Or set up a database cleanup script:

```bash
# cleanup-test-users.sh
docker-compose exec db psql -U postgres -d bitballs -c "DELETE FROM users WHERE email LIKE '%@bitballs-test.com';"
```

## Best Practices

1. **Never commit** `.test-users.json` (already in .gitignore)

2. **Don't modify test users** during tests - they're shared across all tests

3. **Use fixtures** instead of manual login to avoid duplication

4. **Don't delete** test users in individual tests - teardown handles it

5. **Run full suite** with `npm test` to ensure setup/teardown run

6. **CI/CD**: Ensure setup/teardown run in CI pipeline

## CI/CD Considerations

### GitHub Actions Example

```yaml
- name: Run Playwright tests
  working-directory: e2e-test-flows
  run: npm test # This runs setup, tests, and teardown

- name: Cleanup on failure
  if: failure()
  working-directory: e2e-test-flows
  run: |
    # If tests fail, teardown might not run
    # Clean up database manually
    docker-compose exec -T db psql -U postgres -d bitballs \
      -c "DELETE FROM users WHERE email LIKE '%@bitballs-test.com';"
```

### Important Notes

- Setup/teardown run once per test suite, not per test
- All tests share the same test users
- Test users persist throughout the test run
- Database should be in a clean state before setup

## Extending Setup/Teardown

### Adding More Test Data

You can extend the setup to create additional test data:

```typescript
// In global-setup.ts
async function globalSetup(config: FullConfig) {
  // ... create users

  // Login as admin
  await loginUser(page, testUsers.admin.email, testUsers.admin.password);

  // Create test tournament
  await page.goto("/tournaments");
  await page.fill('input[name="name"]', "Test Tournament");
  await page.fill('input[name="date"]', "2024-01-01");
  await page.click('button:has-text("Create Tournament")');

  // Save tournament ID for tests
  // ...
}
```

### Adding Cleanup Steps

Extend teardown to clean up additional data:

```typescript
// In global-teardown.ts
async function globalTeardown(config: FullConfig) {
  // ... login as admin

  // Delete test tournaments
  await page.goto("/tournaments");
  // Delete tournaments created during tests

  // ... delete users
}
```

## Security Notes

- Test passwords are hardcoded (acceptable for test environment)
- Credentials stored in gitignored file (not committed)
- Use test-specific email domain (`@bitballs-test.com`)
- Clean up users after tests to avoid data accumulation

## Summary

- **Setup**: Creates 2 test users (admin + regular) before tests
- **Tests**: Use users via fixtures or `loadTestUsers()`
- **Teardown**: Deletes both users after all tests
- **File**: `.test-users.json` stores credentials temporarily
- **Config**: Enabled via `playwright.config.ts`

This approach ensures:

- ✅ Clean test environment
- ✅ Isolated test users
- ✅ Automatic cleanup
- ✅ Consistent credentials across tests
- ✅ No manual user management needed
