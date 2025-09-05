# Non-Admin Attempts Team Creation
Feature: teams — team-creation
  Background:
    Given a non-admin user is logged in and on the team creation page

  Scenario: Non-admin user attempts to create a team
    Given the non-admin user enters team details
    When the non-admin submits the team creation form
    Then the creation should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/teams.js
- API refs: POST /services/teams
- Feature area: teams
- Requirement: team-creation
- Tags: @e2e @teams @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The team creation page is accessible
