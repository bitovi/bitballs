# Successful Team Deletion by Admin
Feature: teams — team-deletion
  Background:
    Given the admin user is logged in and on the team list page

  Scenario: Admin deletes a team
    Given the admin selects a team to delete
    When the admin confirms the deletion
    Then the team should be deleted and removed from the team list

## Traceability
- Code refs: services/teams.js
- API refs: DELETE /services/teams/:id
- Feature area: teams
- Requirement: team-deletion
- Tags: @e2e @teams @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The team list page is accessible
