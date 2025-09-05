# View User Profile
Feature: user-management — profile-view-edit
  Background:
    Given the user is logged in

  Scenario: User views their profile
    Given the user is logged in
    When the user navigates to the profile page
    Then the user should see their profile information

## Traceability
- Code refs: services/users.js:41-120, public/app.js:121-237
- API refs: GET /services/users/:id
- Feature area: user-management
- Requirement: profile-view-edit
- Tags: @e2e @user-management @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The profile page is accessible
