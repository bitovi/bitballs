Feature: View Game List
  As a user
  I want to view a list of all games
  So that I can select a game to view details

Scenario: View game list
  Given I am on the games list page
  When the page loads
  Then I should see a list of all games with basic information
