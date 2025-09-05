Feature: User Verification by Admin
  As an admin user
  I want to verify users
  So that only verified users have access to certain features

Scenario: Verify user
  Given I am logged in as an admin
  And a user is unverified
  When I click the "Verify User" button for that user
  Then the user's status should change to verified
  And I should see a confirmation message "User verified"
