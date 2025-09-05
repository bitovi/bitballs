Feature: Edit Game Stats
  As an admin user
  I want to edit the stats of a game
  So that I can update game information

Scenario: Edit game stats
  Given I am logged in as an admin
  And I am on the game details page for gameId "1"
  When I edit the stats and save changes
  Then the updated stats should be displayed
  And I should see a confirmation message "Game stats updated"
