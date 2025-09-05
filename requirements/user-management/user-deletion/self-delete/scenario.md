# User Deletes Own Account
Feature: user-management — user-deletion
  Background:
    Given the user is logged in and on the account page

  Scenario: User deletes their own account
    Given the user is logged in
    When the user requests account deletion
    Then the account should be deleted and the user should be logged out

## Traceability
- Code refs: services/users.js:201-317
- API refs: DELETE /services/users/:id
- Feature area: user-management
- Requirement: user-deletion
- Tags: @e2e @user-management @priority-P1 @risk-high @happy

## Preconditions
- The user is logged in
- The account page is accessible
