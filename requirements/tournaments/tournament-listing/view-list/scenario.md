# View Tournament List
Feature: tournaments — tournament-listing
  Background:
    Given the user is logged in and on the tournament list page

  Scenario: User views the list of tournaments
    Given the user is on the tournament list page
    When the page loads
    Then the user should see a list of all tournaments

## Traceability
- Code refs: services/tournaments.js:1-40
- API refs: GET /services/tournaments
- Feature area: tournaments
- Requirement: tournament-listing
- Tags: @e2e @tournaments @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The tournament list page is accessible
