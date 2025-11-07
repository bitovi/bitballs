#!/bin/bash

# Wait for the Bitballs app to be ready
# This script polls the app URL until it responds successfully

set -e

APP_URL="${1:-http://localhost:5001}"
MAX_ATTEMPTS="${2:-60}"
SLEEP_INTERVAL=2

echo "Waiting for app to be ready at $APP_URL..."
echo "Maximum attempts: $MAX_ATTEMPTS (with ${SLEEP_INTERVAL}s intervals)"
echo ""

attempt=0
while [ $attempt -lt $MAX_ATTEMPTS ]; do
    attempt=$((attempt + 1))
    
    if curl -f -s -o /dev/null "$APP_URL"; then
        echo ""
        echo "✓ App is ready! ($attempt attempts)"
        exit 0
    else
        echo -n "."
        sleep $SLEEP_INTERVAL
    fi
done

echo ""
echo "✗ App did not become ready after $MAX_ATTEMPTS attempts"
echo "Check the logs with: docker-compose logs app"
exit 1
