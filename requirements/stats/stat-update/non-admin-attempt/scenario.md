# Non-Admin Attempts Stat Update
Feature: stats — stat-update
  Background:
    Given a non-admin user is logged in and on the stat edit page

  Scenario: Non-admin user attempts to update a stat's details
    Given the non-admin user is on the stat edit page for a specific stat
    When the non-admin updates the stat's details and submits the form
    Then the update should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/stats.js
- API refs: PUT /services/stats/:id
- Feature area: stats
- Requirement: stat-update
- Tags: @e2e @stats @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The stat edit page is accessible
