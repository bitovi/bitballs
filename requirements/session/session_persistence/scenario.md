Feature: Session Persistence
  As a user
  I want my session to persist across pages
  So that I remain logged in until I log out

Scenario: Session persists across navigation
  Given I am logged in
  When I navigate to different pages
  Then my session should remain active
  And I should see user-specific UI on each page
