# Non-Admin Attempts Player Update
Feature: players — player-update
  Background:
    Given a non-admin user is logged in and on the player edit page

  Scenario: Non-admin user attempts to update a player's details
    Given the non-admin user is on the player edit page for a specific player
    When the non-admin updates the player's details and submits the form
    Then the update should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/players.js:121-165
- API refs: PUT /services/players/:id
- Feature area: players
- Requirement: player-update
- Tags: @e2e @players @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The player edit page is accessible
