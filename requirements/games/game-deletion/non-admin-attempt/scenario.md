# Non-Admin Attempts Game Deletion
Feature: games — game-deletion
  Background:
    Given a non-admin user is logged in and on the game list page

  Scenario: Non-admin user attempts to delete a game
    Given the non-admin selects a game to delete
    When the non-admin confirms the deletion
    Then the deletion should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/games.js:121-159
- API refs: DELETE /services/games/:id
- Feature area: games
- Requirement: game-deletion
- Tags: @e2e @games @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The game list page is accessible
