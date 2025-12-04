# Chat Prompts - E2E Test Development Session

This document contains all user prompts from the chat session where the E2E test infrastructure and player management tests were developed.

## Date

November 7, 2025

## Prompts

### 1. Initial App Exploration Request

```
run the app in the vscode browser and thoroughly explore the app flows of the website end-to-end. Document the each flow in its own markdown file.
```

### 2. Standalone Playwright Environment Setup

```
Configure the e2e-test-flows folder to be standalone environment that Playwright can be run in. Do not write any tests, or make any changes outside of this folder.
```

### 3. Test Setup and Teardown Implementation

```
Create a test setup module that runs before the test suite:
- create an admin user: the first user created will always be an admin
- create a regular user: the second user created will not be an admin

Create a test teardown module that runs after the test suite:
- logs into the regular user and deletes itself
- logs into the admin user and deletes itself
```

### 4. Player Management E2E Tests

```
Write a e2e test for #file:02-player-management-flow.md
```

### 5. Documentation Request

```
create a `prompts.md` file that has all of my prompts from this chat
```

## Session Summary

This chat session focused on:

1. Exploring the Bitballs application and documenting E2E flows
2. Setting up a standalone Playwright test environment
3. Implementing automatic test user lifecycle management (setup/teardown)
4. Writing comprehensive E2E tests for player management functionality
5. Documenting the prompts used throughout the session

## Deliverables Created

### Documentation

- `01-authentication-flow.md` - Authentication and registration flow
- `02-player-management-flow.md` - Player management flow
- `03-game-details-flow.md` - Game details and statistics flow
- `04-tournament-management-flow.md` - Tournament management flow
- `05-navigation-and-routing-flow.md` - Navigation and routing flow
- `README.md` - Overview of all flows
- `README-SETUP.md` - Complete setup guide
- `QUICK-START.md` - Quick reference guide
- `SETUP-TEARDOWN.md` - Test user lifecycle documentation
- `tests/README.md` - Test suite documentation

### Configuration Files

- `package.json` - Dependencies and test scripts
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Git ignore rules
- `.npmrc` - NPM configuration

### Test Infrastructure

- `global-setup.ts` - Creates test users before tests
- `global-teardown.ts` - Cleans up test users after tests
- `fixtures/auth.fixture.ts` - Authentication fixtures
- `helpers/page-objects.ts` - Page object model and selectors

### Test Files

- `tests/example.spec.ts` - Example test template
- `tests/player-management.spec.ts` - Comprehensive player management E2E tests

### CI/CD Template

- `.github-workflow-example.yml` - GitHub Actions workflow example

## Technical Approach

The session followed a progressive approach:

1. **Discovery** - Explored the application to understand flows
2. **Documentation** - Documented each flow comprehensively
3. **Infrastructure** - Set up standalone test environment
4. **Automation** - Implemented user lifecycle management
5. **Implementation** - Wrote comprehensive E2E tests
6. **Documentation** - Created guides and references

## Key Decisions

1. **Standalone Environment** - All test files isolated in `e2e-test-flows/` folder
2. **Global Hooks** - Used Playwright's global setup/teardown for user management
3. **Test Fixtures** - Created custom fixtures for authenticated and admin users
4. **Test Isolation** - Each test cleans up created data
5. **Unique Identifiers** - Used timestamps to prevent naming conflicts
6. **No External Changes** - All work contained within `e2e-test-flows/` folder
