# Registration with Weak Password
Feature: authentication — user-registration
  Background:
    Given the registration page is open

  Scenario: User attempts to register with a weak password
    Given the user enters a weak password (e.g., "123")
    When the user submits the registration form
    Then the registration should fail with an error message indicating password requirements

## Traceability
- Code refs: services/users.js:121-200, public/app.js:121-237
- API refs: POST /services/users
- Feature area: authentication
- Requirement: user-registration
- Tags: @e2e @authentication @priority-P2 @risk-med @negative

## Preconditions
- The registration form is accessible
