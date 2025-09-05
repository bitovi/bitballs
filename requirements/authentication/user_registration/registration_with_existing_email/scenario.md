Feature: User Registration
  As a new user
  I want to register with my email and password
  So that I can access the application

Scenario: Registration with existing email
  Given a user already exists with email "test@bitovi.com"
  When I attempt to register with email "test@bitovi.com" and a password
  Then I should see an error message "Email already exists"
  And my account should not be created
