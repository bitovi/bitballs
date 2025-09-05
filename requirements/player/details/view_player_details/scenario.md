Feature: View Player Details
  As a user
  I want to view the details of a player
  So that I can see information about the player

Scenario: View player details
  Given I am on the player details page for playerId "1"
  When the page loads
  Then I should see the player information
