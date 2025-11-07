# E2E Test Flow 1: User Registration & Login

## Overview

This test suite covers the complete user registration and login journey for the Bitballs application. It tests the critical user path from initial registration through successful authentication.

## Test Flow Description

### Flow 1: Complete User Registration & Login

**Steps:**
1. Navigate to home page
2. Click "Register" in navigation dropdown
3. Fill in email and password
4. Submit registration form
5. Verify success message/pending verification state
6. Logout (if logged in automatically)
7. Login with new credentials
8. Verify successful login and session state

### Additional Tests

- **Login Page Visibility**: Verifies that login form is accessible and all elements are visible
- **Invalid Login Credentials**: Tests error handling for incorrect login attempts

## Application Configuration

- **Application URL**: `http://localhost:5000`
- **Output Folder**: `./e2e/flow-1-user-registration-login/`
- **Test Framework**: Playwright
- **Test File**: `tests/flow1-user-registration-login.spec.js`

## Directory Structure

```
app-requirements/
├── e2e/
│   └── flow-1-user-registration-login/     # Screenshots output folder
│       ├── flow1__01-homepage__*.png
│       ├── flow1__02-before-click-register__*.png
│       ├── flow1__03-registration-page__*.png
│       ├── flow1__04-after-registration-submit__*.png
│       ├── flow1__05-registration-success__*.png
│       ├── flow1__06-before-logout__*.png
│       ├── flow1__07-after-logout__*.png
│       ├── flow1__08-before-login__*.png
│       ├── flow1__09-after-login__*.png
│       ├── flow1__10-login-verified__*.png
│       ├── login-page__01-homepage-with-login__*.png
│       ├── login-page__02-login-dropdown-open__*.png
│       └── invalid-login__*.png
├── tests/
│   ├── flow1-user-registration-login.spec.js  # Main test file
│   ├── helpers/
│   │   ├── testData.js                         # Test data generators
│   │   └── testUtils.js                        # Utility functions
│   └── pages/
│       ├── BasePage.js                         # Base page object
│       ├── NavigationPage.js                   # Navigation component POM
│       └── RegistrationPage.js                 # Registration page POM
```

## Prerequisites

1. **Docker**: Application must be running via Docker
   ```bash
   cd /Users/snoattoh/Documents/Bitovi/bitballs
   docker-compose up -d
   ```

2. **Node.js**: Version 18.0.0 or higher

3. **Playwright**: Installed with dependencies
   ```bash
   cd app-requirements
   npm install
   npm run playwright:install
   ```

## Running the Tests

### Run all tests in the flow
```bash
cd app-requirements
npm test tests/flow1-user-registration-login.spec.js
```

### Run with headed browser (see the browser)
```bash
npm run test:headed tests/flow1-user-registration-login.spec.js
```

### Run with UI mode (interactive debugging)
```bash
npm run test:ui tests/flow1-user-registration-login.spec.js
```

### Run in debug mode
```bash
npm run test:debug tests/flow1-user-registration-login.spec.js
```

### Run specific test
```bash
npx playwright test tests/flow1-user-registration-login.spec.js -g "Complete user registration"
```

## Page Objects

### BasePage
Common functionality shared across all page objects:
- `goto(path)`: Navigate to a URL
- `screenshot(name, folder)`: Take a screenshot
- `waitForNavigation()`: Wait for page load
- `isVisible(selector)`: Check element visibility

### NavigationPage
Handles interactions with the navigation bar:
- `clickRegister()`: Open registration page
- `login(email, password)`: Login via dropdown
- `logout()`: Logout from application
- `isLoggedIn()`: Check login status
- `getLoginError()`: Get login error message

### RegistrationPage
Handles user registration and account management:
- `goto()`: Navigate to registration page
- `register(email, password)`: Register new user
- `updatePassword(current, new)`: Update password
- `isVerificationMessageVisible()`: Check for verification prompt
- `getErrorMessage()`: Get error messages

## Test Data

Tests use dynamically generated user data to ensure uniqueness:

```javascript
// Generated format: test-{timestamp}-{random}@bitballs-test.com
const testUser = generateTestUser('new');
console.log(testUser.email);    // test-1699382400000-1234@bitballs-test.com
console.log(testUser.password); // Random 12-character password
```

## Screenshots

All screenshots are automatically captured at key points in the test flow:

- **Naming Convention**: `{testName}__{stepName}__{timestamp}.png`
- **Location**: `./e2e/flow-1-user-registration-login/`
- **Format**: Full-page PNG screenshots

### Key Screenshots Captured

1. **Homepage**: Initial landing page
2. **Registration Page**: Empty registration form
3. **After Registration**: Success/verification state
4. **Login Dropdown**: Login form visibility
5. **Logged In State**: Successful authentication
6. **Error States**: Invalid credentials, form validation

## Expected Behaviors

### Successful Registration
- User is redirected to account/verification page
- Either sees email verification message OR is automatically logged in
- User data is persisted in database

### Successful Login
- User is authenticated and session is created
- "Logout" button becomes visible
- "Account" link is accessible
- Login dropdown is hidden

### Error Handling
- Invalid credentials show error message in dropdown
- User remains logged out after failed login
- Form validation errors are displayed clearly

## Troubleshooting

### Application Not Accessible
```bash
# Check if app is running
docker ps

# Check app logs
docker-compose logs app

# Restart application
docker-compose restart app

# Wait for app to be ready
npm run app:wait
```

### Screenshots Not Generated
- Ensure `./e2e/flow-1-user-registration-login/` folder exists
- Check file permissions
- Verify Playwright has write access to the directory

### Test Timeouts
- Increase timeout in test file or config
- Check network connectivity to localhost:5001
- Verify database is properly initialized

### Login Failures
- Check if email verification is required
- Verify database has proper user table schema
- Check backend logs for authentication errors

## Test Results

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## CI/CD Integration

This test suite can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run E2E Tests
  run: |
    cd app-requirements
    npm run app:up
    npm run app:wait
    npm test tests/flow1-user-registration-login.spec.js
    npm run app:down
```

## Notes

- Each test run generates a unique user to avoid conflicts
- Screenshots include timestamps for tracking test runs
- Tests clean up browser storage before each run
- Page objects follow the Page Object Model (POM) pattern for maintainability

## Future Enhancements

- [ ] Add email verification bypass for testing
- [ ] Implement database seeding for consistent test data
- [ ] Add visual regression testing
- [ ] Test mobile responsive layouts
- [ ] Add performance metrics tracking
- [ ] Implement parallel test execution
- [ ] Add API-level user cleanup after tests
