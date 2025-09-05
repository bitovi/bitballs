# Non-Admin Attempts Player Deletion
Feature: players — player-deletion
  Background:
    Given a non-admin user is logged in and on the player list page

  Scenario: Non-admin user attempts to delete a player
    Given the non-admin selects a player to delete
    When the non-admin confirms the deletion
    Then the deletion should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/players.js:121-165
- API refs: DELETE /services/players/:id
- Feature area: players
- Requirement: player-deletion
- Tags: @e2e @players @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The player list page is accessible
