# Successful Game Update by Admin
Feature: games — game-update
  Background:
    Given the admin user is logged in and on the game edit page

  Scenario: Admin updates a game's details
    Given the admin is on the game edit page for a specific game
    When the admin updates the game's details and submits the form
    Then the game's details should be updated

## Traceability
- Code refs: services/games.js:121-159
- API refs: PUT /services/games/:id
- Feature area: games
- Requirement: game-update
- Tags: @e2e @games @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The game edit page is accessible
