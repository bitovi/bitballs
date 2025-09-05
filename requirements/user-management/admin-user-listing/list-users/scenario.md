# Admin Lists All Users
Feature: user-management — admin-user-listing
  Background:
    Given the admin user is logged in and on the user management page

  Scenario: Admin views the list of all users
    Given the admin is on the user management page
    When the page loads
    Then the admin should see a list of all users

## Traceability
- Code refs: services/users.js:1-120, public/app.js:121-237
- API refs: GET /services/users
- Feature area: user-management
- Requirement: admin-user-listing
- Tags: @e2e @user-management @priority-P1 @risk-med @happy

## Preconditions
- The admin user is logged in
- The user management page is accessible
