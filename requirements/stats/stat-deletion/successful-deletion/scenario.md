# Successful Stat Deletion by Admin
Feature: stats — stat-deletion
  Background:
    Given the admin user is logged in and on the stat list page

  Scenario: Admin deletes a stat
    Given the admin selects a stat to delete
    When the admin confirms the deletion
    Then the stat should be deleted and removed from the stat list

## Traceability
- Code refs: services/stats.js
- API refs: DELETE /services/stats/:id
- Feature area: stats
- Requirement: stat-deletion
- Tags: @e2e @stats @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The stat list page is accessible
