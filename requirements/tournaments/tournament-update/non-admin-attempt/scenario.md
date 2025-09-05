# Non-Admin Attempts Tournament Update
Feature: tournaments — tournament-update
  Background:
    Given a non-admin user is logged in and on the tournament edit page

  Scenario: Non-admin user attempts to update a tournament's details
    Given the non-admin user is on the tournament edit page for a specific tournament
    When the non-admin updates the tournament's details and submits the form
    Then the update should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: PUT /services/tournaments/:id
- Feature area: tournaments
- Requirement: tournament-update
- Tags: @e2e @tournaments @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The tournament edit page is accessible
