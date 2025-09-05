# Non-Admin Attempts Game Creation
Feature: games — game-creation
  Background:
    Given a non-admin user is logged in and on the game creation page

  Scenario: Non-admin user attempts to create a game
    Given the non-admin user enters game details
    When the non-admin submits the game creation form
    Then the creation should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/games.js:41-120
- API refs: POST /services/games
- Feature area: games
- Requirement: game-creation
- Tags: @e2e @games @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The game creation page is accessible
