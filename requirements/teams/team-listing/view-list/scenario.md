# View Team List
Feature: teams — team-listing
  Background:
    Given the user is logged in and on the team list page

  Scenario: User views the list of teams
    Given the user is on the team list page
    When the page loads
    Then the user should see a list of all teams

## Traceability
- Code refs: services/teams.js
- API refs: GET /services/teams
- Feature area: teams
- Requirement: team-listing
- Tags: @e2e @teams @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The team list page is accessible
