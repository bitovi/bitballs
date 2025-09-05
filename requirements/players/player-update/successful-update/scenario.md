# Successful Player Update by Admin
Feature: players — player-update
  Background:
    Given the admin user is logged in and on the player edit page

  Scenario: Admin updates a player's details
    Given the admin is on the player edit page for a specific player
    When the admin updates the player's details and submits the form
    Then the player's details should be updated

## Traceability
- Code refs: services/players.js:121-165
- API refs: PUT /services/players/:id
- Feature area: players
- Requirement: player-update
- Tags: @e2e @players @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The player edit page is accessible
