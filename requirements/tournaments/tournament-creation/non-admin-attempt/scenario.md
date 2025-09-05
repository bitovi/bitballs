# Non-Admin Attempts Tournament Creation
Feature: tournaments — tournament-creation
  Background:
    Given a non-admin user is logged in and on the tournament creation page

  Scenario: Non-admin user attempts to create a tournament
    Given the non-admin user enters tournament details
    When the non-admin submits the tournament creation form
    Then the creation should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: POST /services/tournaments
- Feature area: tournaments
- Requirement: tournament-creation
- Tags: @e2e @tournaments @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The tournament creation page is accessible
