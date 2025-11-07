# Quick Reference - Bitballs Playwright Environment

## First Time Setup

```bash
cd app-requirements
npm run setup
```

Wait for the app to be ready (~30 seconds).

## Daily Usage

### Start the App

```bash
npm run app:up
npm run app:wait
```

### Run Tests

```bash
npm test                # Run all tests
npm run test:headed     # See the browser
npm run test:ui         # Interactive mode
```

### Stop the App

```bash
npm run app:down
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run app:up` | Start app and database |
| `npm run app:down` | Stop app and database |
| `npm run app:logs` | View app logs |
| `npm run app:restart` | Restart app container |
| `npm run app:wait` | Wait for app to be ready |
| `npm test` | Run all tests |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:ui` | Open Playwright UI |
| `npm run verify` | Check environment setup |
| `make setup` | Full setup (alternative) |
| `make clean` | Clean up everything |

## Troubleshooting

### App Not Responding

```bash
npm run app:logs        # Check logs
npm run app:restart     # Restart app
npm run app:wait        # Wait for ready
```

### Clean Restart

```bash
docker-compose down -v
npm run app:up
npm run app:wait
```

### Verify Everything

```bash
npm run verify
```

## URLs

- **App**: <http://localhost:5001>
- **Database**: localhost:5432

## File Structure

```text
app-requirements/
├── docker-compose.yml      # Container setup
├── playwright.config.js    # Test configuration
├── package.json           # Dependencies
├── Makefile               # Make commands
├── tests/                 # Your test files go here
├── README.md             # Main documentation
├── SETUP.md              # Detailed setup guide
└── QUICKSTART.md         # This file
```

## Writing Your First Test

Create `tests/my-test.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test('app loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Bitballs/);
});
```

Run it:

```bash
npx playwright test tests/my-test.spec.js
```

## Getting Help

- Full docs: See `README.md`
- Setup guide: See `SETUP.md`
- Test examples: See `tests/README.md`
- Playwright docs: <https://playwright.dev/>
