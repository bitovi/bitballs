Feature: User Login
  As a registered user
  I want to log in with my email and password
  So that I can access my account

Scenario: Successful login
  Given I am on the login page
  And I have a registered account with email "test@bitovi.com" and password "123"
  When I enter my email and password
  And I submit the login form
  Then I should be logged in
  And I should see my account dashboard
