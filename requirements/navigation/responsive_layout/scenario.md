Feature: Responsive Layout
  As a user
  I want the navigation and main menu to adapt to different screen sizes
  So that I can use the application on any device

Scenario: Responsive layout
  Given I am on any page
  When I resize the browser window to a smaller width
  Then the navigation and main menu should remain visible and usable
  And key actions (e.g., Register button) should be accessible
