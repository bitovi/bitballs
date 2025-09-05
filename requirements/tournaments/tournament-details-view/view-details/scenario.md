# View Tournament Details
Feature: tournaments — tournament-details-view
  Background:
    Given the user is logged in and on the tournament details page

  Scenario: User views details of a tournament
    Given the user is on the tournament details page for a specific tournament
    When the page loads
    Then the user should see the tournament's details

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: GET /services/tournaments/:id
- Feature area: tournaments
- Requirement: tournament-details-view
- Tags: @e2e @tournaments @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The tournament details page is accessible
