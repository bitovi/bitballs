# Team Player Assignment

Feature: Assign players to teams

  Scenario: Admin creates team with four players
    Given I am logged in as an admin
    And there are available players
    When I create a new team
    And I assign four different players to positions 1-4
    And I save the team
    Then the team should be created with all four players assigned
    And the players should be available for selection in games

  Scenario: Admin creates team with duplicate player assignment
    Given I am logged in as an admin
    When I create a new team
    And I assign the same player to multiple positions
    And I try to save the team
    Then I should see an error message about duplicate player assignment
    And the team should not be saved

  Scenario: Admin creates team with missing players
    Given I am logged in as an admin
    When I create a new team
    And I leave some player positions empty
    And I save the team
    Then the team should be saved with partial player assignment
    And empty positions should be displayed as unassigned

  Scenario: View team players in game
    Given there is a team with assigned players
    When I view a game featuring that team
    Then I should see all assigned players listed under the team
    And each player should be clickable for stat entry

  Scenario: Player availability for team assignment
    Given there are players in the system
    When I am assigning players to a team
    Then I should see all available players in the dropdown
    And already assigned players should still be available for other teams
    But I should not be able to assign the same player twice to the same team
