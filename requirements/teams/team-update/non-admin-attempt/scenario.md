# Non-Admin Attempts Team Update
Feature: teams — team-update
  Background:
    Given a non-admin user is logged in and on the team edit page

  Scenario: Non-admin user attempts to update a team's details
    Given the non-admin user is on the team edit page for a specific team
    When the non-admin updates the team's details and submits the form
    Then the update should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/teams.js
- API refs: PUT /services/teams/:id
- Feature area: teams
- Requirement: team-update
- Tags: @e2e @teams @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The team edit page is accessible
