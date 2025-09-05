# Successful Team Update by Admin
Feature: teams — team-update
  Background:
    Given the admin user is logged in and on the team edit page

  Scenario: Admin updates a team's details
    Given the admin is on the team edit page for a specific team
    When the admin updates the team's details and submits the form
    Then the team's details should be updated

## Traceability
- Code refs: services/teams.js
- API refs: PUT /services/teams/:id
- Feature area: teams
- Requirement: team-update
- Tags: @e2e @teams @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The team edit page is accessible
