Feature: User Registration
  As a new user
  I want to register with my email and password
  So that I can access the application

Scenario: Successful registration
  Given I am on the registration page
  When I enter a valid email and password
  And I submit the registration form
  Then I should see a confirmation message "Registration successful"
  And my account should be created
  And I should be logged in automatically
