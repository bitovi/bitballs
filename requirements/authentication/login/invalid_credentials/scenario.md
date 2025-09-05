Feature: User Login
  As a registered user
  I want to log in with my email and password
  So that I can access my account

Scenario: Login with invalid credentials
  Given I am on the login page
  And I have a registered account with email "test@bitovi.com" and password "123"
  When I enter an incorrect password
  And I submit the login form
  Then I should see an error message "Invalid email or password"
  And I should not be logged in
