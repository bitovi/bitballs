# Self Account Deletion
Feature: authentication — account-deletion
  Background:
    Given the account page is open and the user is logged in

  Scenario: User deletes their own account
    Given the user is logged in
    When the user requests account deletion
    Then the account should be deleted and the user should be logged out

## Traceability
- Code refs: services/users.js:201-317
- API refs: DELETE /services/users/:id
- Feature area: authentication
- Requirement: account-deletion
- Tags: @e2e @authentication @priority-P1 @risk-high @happy

## Preconditions
- The user is logged in
- The account page is accessible
