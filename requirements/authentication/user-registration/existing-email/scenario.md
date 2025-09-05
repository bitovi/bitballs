# Registration with Existing Email
Feature: authentication — user-registration
  Background:
    Given the registration page is open

  Scenario: User attempts to register with an email that already exists
    Given a user with email "test@example.com" already exists
    When the user submits the registration form with email "test@example.com"
    Then the registration should fail with an error message indicating the email is already in use

## Traceability
- Code refs: services/users.js:121-200, public/app.js:121-237
- API refs: POST /services/users
- Feature area: authentication
- Requirement: user-registration
- Tags: @e2e @authentication @priority-P1 @risk-med @negative

## Preconditions
- The database contains a user with email "test@example.com"
- The registration form is accessible
