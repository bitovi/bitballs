# Successful Game Deletion by Admin
Feature: games — game-deletion
  Background:
    Given the admin user is logged in and on the game list page

  Scenario: Admin deletes a game
    Given the admin selects a game to delete
    When the admin confirms the deletion
    Then the game should be deleted and removed from the game list

## Traceability
- Code refs: services/games.js:121-159
- API refs: DELETE /services/games/:id
- Feature area: games
- Requirement: game-deletion
- Tags: @e2e @games @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The game list page is accessible
