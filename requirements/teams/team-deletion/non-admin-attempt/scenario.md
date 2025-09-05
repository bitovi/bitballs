# Non-Admin Attempts Team Deletion
Feature: teams — team-deletion
  Background:
    Given a non-admin user is logged in and on the team list page

  Scenario: Non-admin user attempts to delete a team
    Given the non-admin selects a team to delete
    When the non-admin confirms the deletion
    Then the deletion should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/teams.js
- API refs: DELETE /services/teams/:id
- Feature area: teams
- Requirement: team-deletion
- Tags: @e2e @teams @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The team list page is accessible
