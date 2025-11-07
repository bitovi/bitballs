# Playwright Tests

This directory contains Playwright test files.

## Structure

Organize your tests by feature or page:

```
tests/
├── example.spec.js          # Example test
├── homepage.spec.js         # Homepage tests
├── players/                 # Player-related tests
│   ├── list.spec.js
│   └── details.spec.js
├── games/                   # Game-related tests
│   └── details.spec.js
└── tournaments/             # Tournament-related tests
    ├── list.spec.js
    └── details.spec.js
```

## Naming Conventions

- Test files should end with `.spec.js` or `.test.js`
- Use descriptive names that reflect what is being tested
- Group related tests in subdirectories

## Running Specific Tests

```bash
# Run a specific test file
npx playwright test tests/example.spec.js

# Run tests in a specific directory
npx playwright test tests/players/

# Run tests matching a pattern
npx playwright test --grep "homepage"
```

## Best Practices

1. **Use Page Object Model**: Create reusable page objects for complex interactions
2. **Independent Tests**: Each test should be able to run independently
3. **Clean State**: Reset application state between tests when needed
4. **Meaningful Assertions**: Use descriptive expect messages
5. **Wait for Elements**: Use Playwright's auto-waiting features appropriately

## Example Test

```javascript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Bitballs/);
  });

  test('should display navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });
});
```
