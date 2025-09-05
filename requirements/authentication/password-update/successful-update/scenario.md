# Successful Password Update
Feature: authentication — password-update
  Background:
    Given the account page is open and the user is logged in

  Scenario: User updates password successfully
    Given the user enters the current password and a new valid password
    When the user submits the password update form
    Then the password should be updated and the user should receive a confirmation

## Traceability
- Code refs: services/users.js:201-317
- API refs: PUT /services/users/:id
- Feature area: authentication
- Requirement: password-update
- Tags: @e2e @authentication @priority-P1 @risk-high @happy

## Preconditions
- The user is logged in
- The account page is accessible
