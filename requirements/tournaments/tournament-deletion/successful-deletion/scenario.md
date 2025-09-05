# Successful Tournament Deletion by Admin
Feature: tournaments — tournament-deletion
  Background:
    Given the admin user is logged in and on the tournament list page

  Scenario: Admin deletes a tournament
    Given the admin selects a tournament to delete
    When the admin confirms the deletion
    Then the tournament should be deleted and removed from the tournament list

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: DELETE /services/tournaments/:id
- Feature area: tournaments
- Requirement: tournament-deletion
- Tags: @e2e @tournaments @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The tournament list page is accessible
