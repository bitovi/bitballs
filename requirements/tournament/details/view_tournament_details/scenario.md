Feature: View Tournament Details
  As a user
  I want to view the details of a tournament
  So that I can see information about the tournament

Scenario: View tournament details
  Given I am on the tournament details page for tournamentId "1"
  When the page loads
  Then I should see the tournament information
