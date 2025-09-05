# Successful Tournament Creation by Admin
Feature: tournaments — tournament-creation
  Background:
    Given the admin user is logged in and on the tournament creation page

  Scenario: Admin creates a new tournament
    Given the admin enters valid tournament details
    When the admin submits the tournament creation form
    Then the tournament should be created and appear in the tournament list

## Traceability
- Code refs: services/tournaments.js:41-123
- API refs: POST /services/tournaments
- Feature area: tournaments
- Requirement: tournament-creation
- Tags: @e2e @tournaments @priority-P1 @risk-high @happy

## Preconditions
- The admin user is logged in
- The tournament creation page is accessible
