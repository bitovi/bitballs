# Successful Tournament Update by Admin
Feature: tournaments — tournament-update
  Background:
    Given the admin user is logged in and on the tournament edit page

  Scenario: Admin updates a tournament's details
    Given the admin is on the tournament edit page for a specific tournament
    When the admin updates the tournament's details and submits the form
    Then the tournament's details should be updated

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: PUT /services/tournaments/:id
- Feature area: tournaments
- Requirement: tournament-update
- Tags: @e2e @tournaments @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The tournament edit page is accessible
