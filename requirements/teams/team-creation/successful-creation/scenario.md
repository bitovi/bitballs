# Successful Team Creation by Admin
Feature: teams — team-creation
  Background:
    Given the admin user is logged in and on the team creation page

  Scenario: Admin creates a new team
    Given the admin enters valid team details
    When the admin submits the team creation form
    Then the team should be created and appear in the team list

## Traceability
- Code refs: services/teams.js
- API refs: POST /services/teams
- Feature area: teams
- Requirement: team-creation
- Tags: @e2e @teams @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The team creation page is accessible
