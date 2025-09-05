# Login with Invalid Credentials
Feature: authentication — login-logout
  Background:
    Given the login page is open

  Scenario: User logs in with invalid credentials
    Given a user exists with email "test@example.com"
    When the user submits the login form with an incorrect password
    Then the login should fail with an error message

## Traceability
- Code refs: services/users.js, public/app.js:121-237
- API refs: POST /services/session (assumed)
- Feature area: authentication
- Requirement: login-logout
- Tags: @e2e @authentication @priority-P2 @risk-med @negative

## Preconditions
- The user exists in the database
- The login form is accessible
