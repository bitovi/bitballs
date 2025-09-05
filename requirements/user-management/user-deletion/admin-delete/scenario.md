# Admin Deletes User Account
Feature: user-management — user-deletion
  Background:
    Given the admin user is logged in and on the user management page

  Scenario: Admin deletes another user's account
    Given the admin selects a user to delete
    When the admin confirms the deletion
    Then the selected user's account should be deleted

## Traceability
- Code refs: services/users.js:201-317
- API refs: DELETE /services/users/:id
- Feature area: user-management
- Requirement: user-deletion
- Tags: @e2e @user-management @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The user management page is accessible
