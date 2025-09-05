Feature: View Player List
  As a user
  I want to view a list of all players
  So that I can select a player to view details

Scenario: View player list
  Given I am on the players list page
  When the page loads
  Then I should see a list of all players with basic information
