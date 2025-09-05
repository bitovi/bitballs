# Non-Admin Attempts Game Update
Feature: games — game-update
  Background:
    Given a non-admin user is logged in and on the game edit page

  Scenario: Non-admin user attempts to update a game's details
    Given the non-admin user is on the game edit page for a specific game
    When the non-admin updates the game's details and submits the form
    Then the update should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/games.js:121-159
- API refs: PUT /services/games/:id
- Feature area: games
- Requirement: game-update
- Tags: @e2e @games @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The game edit page is accessible
