Feature: View Game Details
  As a user
  I want to view the details of a game
  So that I can see stats and information about the game

Scenario: View game details
  Given I am on the game details page for gameId "1"
  When the page loads
  Then I should see the game information and stats
