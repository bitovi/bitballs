# Bitballs Playwright Environment - Setup Guide

Complete guide for setting up and using the standalone Playwright testing environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Setup](#quick-setup)
3. [Manual Setup](#manual-setup)
4. [Verification](#verification)
5. [Running Tests](#running-tests)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure you have the following installed:

- **Docker** (version 20.10 or higher)
  - Install from: <https://docs.docker.com/get-docker/>
  - Verify: `docker --version`

- **Docker Compose** (version 1.29 or higher, or Docker Compose V2)
  - Usually included with Docker Desktop
  - Verify: `docker-compose --version` or `docker compose version`

- **Node.js** (version 18.0 or higher)
  - Install from: <https://nodejs.org/>
  - Verify: `node --version`

- **npm** (version 9.0 or higher)
  - Comes with Node.js
  - Verify: `npm --version`

## Quick Setup

### Option 1: Using npm (Recommended)

```bash
cd app-requirements
npm run setup
```

This will:
1. Install all npm dependencies
2. Install Playwright browsers
3. Start Docker containers (database + app)
4. Wait for the app to be ready

### Option 2: Using Make

```bash
cd app-requirements
make setup
```

### What Happens During Setup

1. **npm install**: Installs Playwright and other dependencies
2. **Playwright browsers**: Downloads Chromium, Firefox, and WebKit browsers
3. **Docker containers**: Builds and starts:
   - PostgreSQL 9.5 database (port 5432)
   - Bitballs Node.js app (port 5001)
4. **Database initialization**: Runs migrations automatically via entrypoint script
5. **Health checks**: Ensures both services are healthy and ready

## Manual Setup

If you prefer to run each step individually:

### Step 1: Install Dependencies

```bash
cd app-requirements
npm install
```

### Step 2: Install Playwright Browsers

```bash
npm run playwright:install
```

This downloads the browser binaries required for testing (~300MB).

### Step 3: Start the Application

```bash
npm run app:up
```

Or with Docker Compose directly:

```bash
docker-compose up -d
```

### Step 4: Wait for App to Initialize

The app needs time to start up and initialize the database. You can either:

**Option A: Use the wait script**

```bash
npm run app:wait
```

**Option B: Check manually**

```bash
# Watch logs
npm run app:logs

# Or test connectivity
curl http://localhost:5001
```

The app is ready when you see log messages indicating the server is listening.

## Verification

### Automated Verification

Run the verification script to check everything:

```bash
npm run verify
```

Or:

```bash
./verify-setup.sh
```

This checks:
- Prerequisites (Docker, Node.js, npm)
- Dependencies installed
- Port availability (5001, 5432)
- Container status
- App connectivity

### Manual Verification

**Check containers are running:**

```bash
docker-compose ps
```

Expected output:
```
NAME               STATUS              PORTS
bitballs-app       Up (healthy)       0.0.0.0:5001->5000/tcp
bitballs-db        Up (healthy)       0.0.0.0:5432->5432/tcp
```

**Check app is responding:**

```bash
curl http://localhost:5001
```

Should return HTML content from the app.

**Check logs for errors:**

```bash
npm run app:logs
```

Look for any ERROR messages.

## Running Tests

Once setup is complete and verified:

### Basic Test Runs

```bash
# Run all tests in all browsers (headless)
npm test

# Run tests in headed mode (see browser window)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode (step through)
npm run test:debug
```

### Advanced Test Runs

```bash
# Run specific test file
npx playwright test tests/example.spec.js

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests matching pattern
npx playwright test --grep "homepage"

# Run with specific number of workers
npx playwright test --workers=2

# Update snapshots
npx playwright test --update-snapshots
```

### View Test Reports

After running tests:

```bash
npx playwright show-report
```

## Troubleshooting

### Port Already in Use

**Problem**: Ports 5001 or 5432 are already in use.

**Solution**:

```bash
# Find what's using the port
lsof -i :5001
lsof -i :5432

# Kill the process or stop the conflicting service
# Then try again
```

Alternatively, modify the ports in `docker-compose.yml` and `playwright.config.js`.

### Containers Won't Start

**Problem**: Docker containers fail to start.

**Solutions**:

1. **Check Docker is running**:
   ```bash
   docker info
   ```

2. **Check container logs**:
   ```bash
   docker-compose logs
   ```

3. **Rebuild containers**:
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Database Connection Errors

**Problem**: App can't connect to database.

**Solutions**:

1. **Wait longer**: Database initialization takes ~10-30 seconds
   ```bash
   npm run app:wait
   ```

2. **Check database health**:
   ```bash
   docker-compose ps db
   ```

3. **Restart services in correct order**:
   ```bash
   docker-compose down
   docker-compose up -d db
   # Wait 30 seconds
   docker-compose up -d app
   ```

### Playwright Browsers Not Found

**Problem**: Error about missing browser binaries.

**Solution**:

```bash
npm run playwright:install
```

Or with specific browser:

```bash
npx playwright install chromium
```

### App Not Responding

**Problem**: App containers running but not responding on port 5001.

**Solutions**:

1. **Check app logs**:
   ```bash
   npm run app:logs
   ```

2. **Check container health**:
   ```bash
   docker-compose ps
   ```
   Should show "healthy" status.

3. **Restart app**:
   ```bash
   npm run app:restart
   npm run app:wait
   ```

### Clean Start

To completely reset the environment:

```bash
# Stop containers and remove volumes
docker-compose down -v

# Remove node modules
rm -rf node_modules

# Start fresh
npm run setup
```

Or use Make:

```bash
make clean
make setup
```

### Permission Issues (Linux/Mac)

If you encounter permission errors with scripts:

```bash
chmod +x verify-setup.sh wait-for-app.sh
```

## Next Steps

Once your environment is set up and verified:

1. **Review Configuration**: Check `playwright.config.js` for test settings
2. **Create Tests**: Add test files in the `tests/` directory
3. **Review README**: See `tests/README.md` for test organization guidelines
4. **Run Tests**: Execute your test suite with `npm test`

## Getting Help

- **Playwright Documentation**: <https://playwright.dev/>
- **Docker Documentation**: <https://docs.docker.com/>
- **Check Logs**: `npm run app:logs` for application logs
- **Verify Setup**: `npm run verify` to check environment status

## Environment Details

- **App URL**: <http://localhost:5001>
- **Database**: PostgreSQL 9.5 on port 5432
- **Node Version**: 8.17.0 (in Docker container)
- **Playwright Version**: ^1.48.0
- **Browsers**: Chromium, Firefox, WebKit

## Files Overview

- `docker-compose.yml` - Container orchestration
- `playwright.config.js` - Playwright configuration
- `package.json` - Dependencies and scripts
- `Makefile` - Convenience commands
- `verify-setup.sh` - Setup verification script
- `wait-for-app.sh` - App readiness checker
- `.env.example` - Environment variables template
- `tests/` - Test files directory
