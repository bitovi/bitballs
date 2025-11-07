# Tournament Game Management

Feature: Manage games within tournaments

  Scenario: Admin creates game with round and court assignment
    Given I am logged in as an admin
    And there is a tournament with teams
    When I create a new game
    And I select a round and court
    And I assign home and away teams
    And I save the game
    Then the game should appear in the tournament's game grid
    And it should be displayed in the correct round and court position

  Scenario: Admin creates duplicate game assignment
    Given I am logged in as an admin
    And there is already a game assigned to a specific round and court
    When I try to create another game
    And I select the same round and court
    And I try to save the game
    Then I should see an error message about the conflicting assignment
    And the game should not be created

  Scenario: View tournament games in grid format
    Given there is a tournament with multiple games
    When I view the tournament details
    Then I should see games organized in a grid by round and court
    And each game should show the team colors
    And I should be able to click on any game to view details

  Scenario: Admin deletes game from tournament
    Given I am logged in as an admin
    And there is a game in the tournament
    When I click the delete button for that game
    Then the game should be removed from the tournament
    And the grid position should become empty

  Scenario: Game availability based on team assignments
    Given there is a tournament with teams
    When I am creating a game for a specific round
    Then I should only see teams available for that round
    And teams already assigned to other games in the same round should be excluded
