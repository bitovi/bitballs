# Page Not Found (404)
Feature: navigation — page-not-found
  Background:
    Given the user is logged in

  Scenario: User navigates to a non-existent page
    Given the user enters a URL for a non-existent page
    When the page loads
    Then the user should see a 404 error page

## Traceability
- Code refs: public/app.js:121-237
- Feature area: navigation
- Requirement: page-not-found
- Tags: @e2e @navigation @priority-P2 @risk-low @edge

## Preconditions
- The user is logged in
- The application is running
