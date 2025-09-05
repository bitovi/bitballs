# Successful Game Creation by Admin
Feature: games — game-creation
  Background:
    Given the admin user is logged in and on the game creation page

  Scenario: Admin creates a new game
    Given the admin enters valid game details
    When the admin submits the game creation form
    Then the game should be created and appear in the game list

## Traceability
- Code refs: services/games.js:41-120
- API refs: POST /services/games
- Feature area: games
- Requirement: game-creation
- Tags: @e2e @games @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The game creation page is accessible
