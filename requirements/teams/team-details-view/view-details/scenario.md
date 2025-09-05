# View Team Details
Feature: teams — team-details-view
  Background:
    Given the user is logged in and on the team details page

  Scenario: User views details of a team
    Given the user is on the team details page for a specific team
    When the page loads
    Then the user should see the team's details

## Traceability
- Code refs: services/teams.js
- API refs: GET /services/teams/:id
- Feature area: teams
- Requirement: team-details-view
- Tags: @e2e @teams @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The team details page is accessible
