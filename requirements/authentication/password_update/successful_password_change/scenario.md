Feature: Password Update
  As a logged-in user
  I want to change my password
  So that I can keep my account secure

Scenario: Successful password change
  Given I am logged in
  When I enter my current password and a new password
  And I submit the password change form
  Then my password should be updated
  And I should see a confirmation message "Password updated successfully"
