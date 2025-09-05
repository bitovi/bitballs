# View Game List
Feature: games — game-listing
  Background:
    Given the user is logged in and on the game list page

  Scenario: User views the list of games
    Given the user is on the game list page
    When the page loads
    Then the user should see a list of all games

## Traceability
- Code refs: services/games.js:1-40
- API refs: GET /services/games
- Feature area: games
- Requirement: game-listing
- Tags: @e2e @games @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The game list page is accessible
