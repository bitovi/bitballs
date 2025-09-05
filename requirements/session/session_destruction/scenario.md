Feature: Session Destruction
  As a user
  I want my session to be destroyed when I log out or delete my account
  So that my data is secure

Scenario: Session destroyed on logout
  Given I am logged in
  When I log out
  Then my session should be destroyed
  And I should be redirected to the login or registration page

Scenario: Session destroyed on account deletion
  Given I am logged in
  When I delete my account
  Then my session should be destroyed
  And I should be redirected to the registration page
