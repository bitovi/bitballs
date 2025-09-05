# Successful Stat Update by Admin
Feature: stats — stat-update
  Background:
    Given the admin user is logged in and on the stat edit page

  Scenario: Admin updates a stat's details
    Given the admin is on the stat edit page for a specific stat
    When the admin updates the stat's details and submits the form
    Then the stat's details should be updated

## Traceability
- Code refs: services/stats.js
- API refs: PUT /services/stats/:id
- Feature area: stats
- Requirement: stat-update
- Tags: @e2e @stats @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The stat edit page is accessible
