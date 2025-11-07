#!/bin/bash

# Bitballs Playwright Environment Setup Verification Script
# This script verifies that the environment is properly configured

set -e

echo "================================================"
echo "Bitballs Playwright Environment Setup Check"
echo "================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check command availability
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is not installed"
        return 1
    fi
}

# Function to check port availability
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠${NC} Port $1 is in use"
        return 1
    else
        echo -e "${GREEN}✓${NC} Port $1 is available"
        return 0
    fi
}

# Check prerequisites
echo "Checking prerequisites..."
echo ""

PREREQ_OK=true

check_command node || PREREQ_OK=false
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  Node version: $NODE_VERSION"
fi
echo ""

check_command npm || PREREQ_OK=false
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "  npm version: $NPM_VERSION"
fi
echo ""

check_command docker || PREREQ_OK=false
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "  Docker version: $DOCKER_VERSION"
fi
echo ""

check_command docker-compose || check_command docker && docker compose version &> /dev/null || PREREQ_OK=false
if command -v docker-compose &> /dev/null || (command -v docker &> /dev/null && docker compose version &> /dev/null 2>&1); then
    if command -v docker-compose &> /dev/null; then
        COMPOSE_VERSION=$(docker-compose --version)
    else
        COMPOSE_VERSION=$(docker compose version)
    fi
    echo "  Docker Compose version: $COMPOSE_VERSION"
fi
echo ""

if [ "$PREREQ_OK" = false ]; then
    echo -e "${RED}✗ Some prerequisites are missing. Please install them and try again.${NC}"
    exit 1
fi

# Check if node_modules exists
echo "Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"
else
    echo -e "${YELLOW}⚠${NC} node_modules directory not found. Run 'npm install' first."
fi
echo ""

# Check if Playwright browsers are installed
echo "Checking Playwright installation..."
if [ -d "node_modules/@playwright" ]; then
    echo -e "${GREEN}✓${NC} Playwright package is installed"
    # Check if browsers are installed
    if npx playwright --version &> /dev/null; then
        PLAYWRIGHT_VERSION=$(npx playwright --version)
        echo "  $PLAYWRIGHT_VERSION"
    fi
else
    echo -e "${YELLOW}⚠${NC} Playwright not found. Run 'npm install' first."
fi
echo ""

# Check port availability
echo "Checking port availability..."
check_port 5001
check_port 5432
echo ""

# Check Docker containers status
echo "Checking Docker containers..."
if docker ps --format '{{.Names}}' | grep -q "bitballs"; then
    echo -e "${GREEN}✓${NC} Bitballs containers are running:"
    docker ps --filter "name=bitballs" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    echo -e "${YELLOW}⚠${NC} No Bitballs containers are running. Run 'npm run app:up' to start."
fi
echo ""

# Check app connectivity
echo "Checking app connectivity..."
if curl -f http://localhost:5001 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} App is responding on http://localhost:5001"
else
    echo -e "${YELLOW}⚠${NC} App is not responding on http://localhost:5001"
    echo "  If containers are starting, wait a few moments and try again."
fi
echo ""

# Summary
echo "================================================"
echo "Setup verification complete!"
echo ""
if [ "$PREREQ_OK" = true ]; then
    echo -e "${GREEN}All prerequisites are met.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. If dependencies are not installed: npm install"
    echo "  2. If Playwright browsers are not installed: npm run playwright:install"
    echo "  3. If containers are not running: npm run app:up"
    echo "  4. Wait for app to be ready (check with: curl http://localhost:5001)"
    echo "  5. Run tests: npm test"
else
    echo -e "${RED}Some prerequisites are missing. Please install them first.${NC}"
    exit 1
fi
echo "================================================"
