# View Stat List
Feature: stats — stat-listing
  Background:
    Given the user is logged in and on the stat list page

  Scenario: User views the list of stats
    Given the user is on the stat list page
    When the page loads
    Then the user should see a list of all stats

## Traceability
- Code refs: services/stats.js
- API refs: GET /services/stats
- Feature area: stats
- Requirement: stat-listing
- Tags: @e2e @stats @priority-P2 @risk-low @happy

## Preconditions
- The user is logged in
- The stat list page is accessible
