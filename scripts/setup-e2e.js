#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

/**
 * E2E Test Setup Script
 * This script sets up the database with test users for Playwright E2E tests
 */

console.log('Setting up E2E test environment...');

// Run database migrations to ensure test users exist
const migrate = spawn('npm', ['run', 'db-migrate'], {
  cwd: path.resolve(__dirname),
  stdio: 'inherit'
});

migrate.on('close', (code) => {
  if (code !== 0) {
    console.error(`Migration failed with exit code ${code}`);
    process.exit(1);
  }
  
  console.log('E2E test environment setup complete!');
  console.log('Test users available:');
  console.log('  Admin: admin@bitballs.com / testpassword123');
  console.log('  User:  user@bitballs.com / testpassword123');
  
  // Exit successfully
  process.exit(0);
});

migrate.on('error', (err) => {
  console.error('Failed to run migration:', err);
  process.exit(1);
});