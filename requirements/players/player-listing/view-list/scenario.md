# View Player List
Feature: players — player-listing
  Background:
    Given the user is logged in and on the player list page

  Scenario: User views the list of players
    Given the user is on the player list page
    When the page loads
    Then the user should see a list of all players

## Traceability
- Code refs: services/players.js:1-40
- API refs: GET /services/players
- Feature area: players
- Requirement: player-listing
- Tags: @e2e @players @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The player list page is accessible
