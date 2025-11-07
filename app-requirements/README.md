# Bitballs App Requirements - Playwright Testing Environment

This is a standalone environment for running Playwright tests against the Bitballs application.

## Overview

This folder contains everything needed to:
- Spin up the Bitballs app in a Docker container (accessible at http://localhost:5001)
- Run Playwright tests against the running application
- All without modifying any files outside this directory

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18 or higher installed
- npm installed

## Quick Start

### 1. Initial Setup

Run the setup script to install dependencies and start the app:

```bash
npm run setup
```

This will:
- Install npm dependencies (including Playwright)
- Install Playwright browsers
- Start the Docker containers (database + app)

### 2. Wait for the App to be Ready

After starting the containers, wait for the app to be fully initialized. You can check the logs:

```bash
npm run app:logs
```

The app should be accessible at http://localhost:5001

### 3. Run Playwright Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see the browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Debug tests
npm run test:debug
```

## Available Commands

### Application Management

```bash
# Start the app and database
npm run app:up

# Stop the app and database
npm run app:down

# Restart the app
npm run app:restart

# View app logs
npm run app:logs
```

### Playwright Commands

```bash
# Install Playwright browsers
npm run playwright:install

# Run tests (headless)
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug
```

## Project Structure

```
app-requirements/
├── docker-compose.yml      # Docker compose configuration for app + database
├── playwright.config.js    # Playwright configuration
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── tests/                # Place your Playwright tests here (create this folder)
```

## Configuration

### Docker Compose

The `docker-compose.yml` file:
- Builds the app from the parent directory using the existing Dockerfile
- Runs PostgreSQL 9.5 database
- Exposes the app on port 5001 (maps to container port 5000)
- Includes health checks for both database and app
- Uses named volumes for database persistence

### Playwright

The `playwright.config.js` file:
- Configures tests to run against http://localhost:5001
- Sets up multiple browser projects (Chromium, Firefox, WebKit)
- Includes mobile viewport configurations
- Configures test timeout, retries, and reporting
- Waits for the app to be ready before running tests

## Writing Tests

Create a `tests/` directory in this folder and add your Playwright test files:

```bash
mkdir tests
```

Example test file (`tests/example.spec.js`):

```javascript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Bitballs/);
});
```

## Troubleshooting

### Port Already in Use

If port 5001 is already in use, you can either:
1. Stop the conflicting service
2. Modify the port mapping in `docker-compose.yml` and `playwright.config.js`

### App Not Starting

Check the logs:
```bash
npm run app:logs
```

Common issues:
- Database not ready: Wait a few more seconds for PostgreSQL to initialize
- Port conflicts: Check if ports 5001 or 5432 are already in use

### Clean Start

To completely reset the environment:

```bash
# Stop and remove containers, networks, and volumes
docker-compose down -v

# Start fresh
npm run app:up
```

## Notes

- The app runs in development mode with NODE_ENV=development
- Database data persists in a Docker volume named `app-requirements_pgdata`
- The Dockerfile and application code are in the parent directory
- This folder is completely self-contained for Playwright testing purposes
