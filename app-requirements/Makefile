.PHONY: help setup install test clean app-up app-down app-restart app-logs app-health

# Default target
help:
	@echo "Bitballs Playwright Testing Environment"
	@echo ""
	@echo "Available targets:"
	@echo "  make setup        - Complete setup: install deps, browsers, and start app"
	@echo "  make install      - Install npm dependencies"
	@echo "  make test         - Run Playwright tests"
	@echo "  make test-headed  - Run tests in headed mode"
	@echo "  make test-ui      - Run tests in UI mode"
	@echo "  make test-debug   - Run tests in debug mode"
	@echo "  make app-up       - Start the Docker containers"
	@echo "  make app-down     - Stop the Docker containers"
	@echo "  make app-restart  - Restart the app container"
	@echo "  make app-logs     - View app logs"
	@echo "  make app-health   - Check app health"
	@echo "  make clean        - Stop containers and clean up"

# Complete setup
setup: install
	npm run playwright:install
	npm run app:up
	@echo ""
	@echo "Setup complete! Wait a few moments for the app to initialize."
	@echo "Check status with: make app-health"
	@echo "View logs with: make app-logs"

# Install dependencies
install:
	npm install

# Run tests
test:
	npm test

test-headed:
	npm run test:headed

test-ui:
	npm run test:ui

test-debug:
	npm run test:debug

# Application management
app-up:
	docker-compose up -d

app-down:
	docker-compose down

app-restart:
	docker-compose restart app

app-logs:
	docker-compose logs -f app

app-health:
	@echo "Checking app health..."
	@docker-compose ps
	@echo ""
	@echo "Testing app connectivity..."
	@curl -f http://localhost:5001 > /dev/null 2>&1 && echo "✓ App is responding on port 5001" || echo "✗ App is not responding on port 5001"

# Clean up
clean:
	docker-compose down -v
	rm -rf node_modules test-results playwright-report
	@echo "Cleanup complete!"
