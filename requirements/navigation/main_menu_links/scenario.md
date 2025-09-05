Feature: Main Navigation Menu
  As a user
  I want to use the main navigation menu
  So that I can access different pages of the application

Scenario: Main menu links
  Given I am on any page
  When I click a navigation link (e.g., Games, Tournaments, Players, Users, Account)
  Then I should be routed to the correct page
  And the page content should update accordingly
