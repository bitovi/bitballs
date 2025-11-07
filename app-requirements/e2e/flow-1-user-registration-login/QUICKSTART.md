# Quick Start: Running Flow 1 E2E Test

## Prerequisites Check

1. **Docker is running**: Check with `docker ps`
2. **Application is running**: Visit http://localhost:5000
3. **Node.js installed**: Version 18+

## Run the Test (Quick Commands)

```bash
# Navigate to app-requirements folder
cd /Users/snoattoh/Documents/Bitovi/bitballs/app-requirements

# Install dependencies (if not already done)
npm install

# Install Playwright browsers (if not already done)
npm run playwright:install

# Ensure application is running
docker-compose up -d

# Wait for app to be ready
npm run app:wait

# Run the Flow 1 test
npm test tests/flow1-user-registration-login.spec.js
```

## View Results

### Screenshots
```bash
# View screenshots in Finder
open e2e/flow-1-user-registration-login/

# Or list them in terminal
ls -lh e2e/flow-1-user-registration-login/
```

### Test Report
```bash
# Open HTML report in browser
npx playwright show-report
```

## Run Options

### See the browser while testing
```bash
npm run test:headed tests/flow1-user-registration-login.spec.js
```

### Interactive debugging mode
```bash
npm run test:ui tests/flow1-user-registration-login.spec.js
```

### Run specific test only
```bash
# Just the main flow test
npx playwright test -g "Complete user registration"

# Just the login page visibility test
npx playwright test -g "Login page should be accessible"

# Just the invalid credentials test
npx playwright test -g "invalid login credentials"
```

## What Gets Created

After running the test, you'll find:

```
e2e/flow-1-user-registration-login/
├── flow1__01-homepage__[timestamp].png
├── flow1__02-before-click-register__[timestamp].png
├── flow1__03-registration-page__[timestamp].png
├── flow1__04-after-registration-submit__[timestamp].png
├── flow1__05-registration-success__[timestamp].png
├── flow1__06-before-logout__[timestamp].png
├── flow1__07-after-logout__[timestamp].png
├── flow1__08-before-login__[timestamp].png
├── flow1__09-after-login__[timestamp].png
├── flow1__10-login-verified__[timestamp].png
├── login-page__01-homepage-with-login__[timestamp].png
├── login-page__02-login-dropdown-open__[timestamp].png
└── invalid-login__[timestamps].png
```

## Troubleshooting

### App not responding at localhost:5000
```bash
# Check if containers are running
docker ps

# Check app logs
docker-compose logs app

# Restart app
docker-compose restart app

# Full reset (if needed)
docker-compose down
docker-compose up -d
npm run app:wait
```

### "Cannot find module" errors
```bash
# Reinstall dependencies
npm install
```

### Browser not installed
```bash
# Install Playwright browsers
npm run playwright:install
```

### Permission errors on screenshots
```bash
# Create the output directory with proper permissions
mkdir -p e2e/flow-1-user-registration-login
chmod 755 e2e/flow-1-user-registration-login
```

## Expected Test Duration

- **Complete flow test**: ~15-20 seconds
- **Login page visibility**: ~3-5 seconds
- **Invalid credentials test**: ~5-7 seconds
- **Total suite**: ~25-30 seconds

## Success Indicators

✅ All tests should pass (3 tests total)
✅ Screenshots should be created in `e2e/flow-1-user-registration-login/`
✅ Console output shows step-by-step progress
✅ HTML report shows green checkmarks

## Next Steps

1. View the generated screenshots
2. Review the test report
3. Examine the test code in `tests/flow1-user-registration-login.spec.js`
4. Read the full documentation in `e2e/flow-1-user-registration-login/README.md`
