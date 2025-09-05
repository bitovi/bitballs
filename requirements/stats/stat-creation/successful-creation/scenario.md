# Successful Stat Creation by Admin
Feature: stats — stat-creation
  Background:
    Given the admin user is logged in and on the stat creation page

  Scenario: Admin creates a new stat
    Given the admin enters valid stat details
    When the admin submits the stat creation form
    Then the stat should be created and appear in the stat list

## Traceability
- Code refs: services/stats.js
- API refs: POST /services/stats
- Feature area: stats
- Requirement: stat-creation
- Tags: @e2e @stats @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The stat creation page is accessible
