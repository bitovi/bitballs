# View Player Details
Feature: players — player-details-view
  Background:
    Given the user is logged in and on the player details page

  Scenario: User views details of a player
    Given the user is on the player details page for a specific player
    When the page loads
    Then the user should see the player's details

## Traceability
- Code refs: services/players.js:41-120
- API refs: GET /services/players/:id
- Feature area: players
- Requirement: player-details-view
- Tags: @e2e @players @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The player details page is accessible
