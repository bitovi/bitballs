# Non-Admin Attempts Stat Deletion
Feature: stats — stat-deletion
  Background:
    Given a non-admin user is logged in and on the stat list page

  Scenario: Non-admin user attempts to delete a stat
    Given the non-admin selects a stat to delete
    When the non-admin confirms the deletion
    Then the deletion should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/stats.js
- API refs: DELETE /services/stats/:id
- Feature area: stats
- Requirement: stat-deletion
- Tags: @e2e @stats @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The stat list page is accessible
