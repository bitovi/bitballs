# Edit User Profile
Feature: user-management — profile-view-edit
  Background:
    Given the user is logged in and on the profile page

  Scenario: User edits their profile information
    Given the user is on the profile page
    When the user updates their profile information and submits the form
    Then the profile should be updated and the user should see a confirmation

## Traceability
- Code refs: services/users.js:201-317, public/app.js:121-237
- API refs: PUT /services/users/:id
- Feature area: user-management
- Requirement: profile-view-edit
- Tags: @e2e @user-management @priority-P2 @risk-med @happy

## Preconditions
- The user is logged in
- The profile page is accessible
