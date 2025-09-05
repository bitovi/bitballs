Feature: Password Update
  As a logged-in user
  I want to change my password
  So that I can keep my account secure

Scenario: Invalid current password
  Given I am logged in
  When I enter an incorrect current password and a new password
  And I submit the password change form
  Then I should see an error message "Current password is incorrect"
  And my password should not be updated
