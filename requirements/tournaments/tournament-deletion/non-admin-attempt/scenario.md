# Non-Admin Attempts Tournament Deletion
Feature: tournaments — tournament-deletion
  Background:
    Given a non-admin user is logged in and on the tournament list page

  Scenario: Non-admin user attempts to delete a tournament
    Given the non-admin selects a tournament to delete
    When the non-admin confirms the deletion
    Then the deletion should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: DELETE /services/tournaments/:id
- Feature area: tournaments
- Requirement: tournament-deletion
- Tags: @e2e @tournaments @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The tournament list page is accessible
