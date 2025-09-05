# Successful Login
Feature: authentication — login-logout
  Background:
    Given the login page is open

  Scenario: User logs in with valid credentials
    Given a user exists with email "test@example.com" and password "securePassword"
    When the user submits the login form with valid credentials
    Then the user should be logged in and redirected to the dashboard

## Traceability
- Code refs: services/users.js, public/app.js:121-237
- API refs: POST /services/session (assumed)
- Feature area: authentication
- Requirement: login-logout
- Tags: @e2e @authentication @priority-P1 @risk-high @happy

## Preconditions
- The user exists in the database
- The login form is accessible
