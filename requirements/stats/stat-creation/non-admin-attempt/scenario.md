# Non-Admin Attempts Stat Creation
Feature: stats — stat-creation
  Background:
    Given a non-admin user is logged in and on the stat creation page

  Scenario: Non-admin user attempts to create a stat
    Given the non-admin user enters stat details
    When the non-admin submits the stat creation form
    Then the creation should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/stats.js
- API refs: POST /services/stats
- Feature area: stats
- Requirement: stat-creation
- Tags: @e2e @stats @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The stat creation page is accessible
