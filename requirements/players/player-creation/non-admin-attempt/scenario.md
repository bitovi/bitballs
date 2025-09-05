# Non-Admin Attempts Player Creation
Feature: players — player-creation
  Background:
    Given a non-admin user is logged in and on the player creation page

  Scenario: Non-admin user attempts to create a player
    Given the non-admin user enters player details
    When the non-admin submits the player creation form
    Then the creation should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/players.js:41-120
- API refs: POST /services/players
- Feature area: players
- Requirement: player-creation
- Tags: @e2e @players @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The player creation page is accessible
