# Main Navigation Between Areas
Feature: navigation — main-navigation
  Background:
    Given the user is logged in

  Scenario: User navigates between main areas
    Given the user is on any main page (players, teams, games, tournaments, stats)
    When the user clicks a navigation link to another area
    Then the user should be taken to the selected area and see the relevant content

## Traceability
- Code refs: public/app.js:41-237
- Feature area: navigation
- Requirement: main-navigation
- Tags: @e2e @navigation @priority-P1 @risk-med @happy

## Preconditions
- The user is logged in
- The navigation bar is visible
