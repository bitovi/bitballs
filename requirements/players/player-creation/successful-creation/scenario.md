# Successful Player Creation by Admin
Feature: players — player-creation
  Background:
    Given the admin user is logged in and on the player creation page

  Scenario: Admin creates a new player
    Given the admin enters valid player details
    When the admin submits the player creation form
    Then the player should be created and appear in the player list

## Traceability
- Code refs: services/players.js:41-120
- API refs: POST /services/players
- Feature area: players
- Requirement: player-creation
- Tags: @e2e @players @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The player creation page is accessible
