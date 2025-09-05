# Password Update with Invalid Current Password
Feature: authentication — password-update
  Background:
    Given the account page is open and the user is logged in

  Scenario: User attempts to update password with incorrect current password
    Given the user enters an incorrect current password and a new valid password
    When the user submits the password update form
    Then the update should fail with an error message indicating the current password is incorrect

## Traceability
- Code refs: services/users.js:201-317
- API refs: PUT /services/users/:id
- Feature area: authentication
- Requirement: password-update
- Tags: @e2e @authentication @priority-P2 @risk-med @negative

## Preconditions
- The user is logged in
- The account page is accessible
