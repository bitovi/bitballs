Feature: Account Deletion
  As a logged-in user
  I want to delete my account
  So that I can remove my data from the application

Scenario: Successful account deletion
  Given I am logged in
  When I choose to delete my account
  And I confirm the deletion
  Then my account should be deleted
  And I should be logged out
  And I should be redirected to the registration page
