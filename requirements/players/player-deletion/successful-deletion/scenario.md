# Successful Player Deletion by Admin
Feature: players — player-deletion
  Background:
    Given the admin user is logged in and on the player list page

  Scenario: Admin deletes a player
    Given the admin selects a player to delete
    When the admin confirms the deletion
    Then the player should be deleted and removed from the player list

## Traceability
- Code refs: services/players.js:121-165
- API refs: DELETE /services/players/:id
- Feature area: players
- Requirement: player-deletion
- Tags: @e2e @players @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The player list page is accessible
