# View Admin-Only Pages
Feature: admin-privileges — admin-views
  Background:
    Given the admin user is logged in

  Scenario: Admin accesses admin-only pages
    Given the admin user navigates to an admin-only page
    When the page loads
    Then the admin should see the page content

## Traceability
- Code refs: services/* (adminOnly middleware)
- API refs: GET on admin-only pages
- Feature area: admin-privileges
- Requirement: admin-views
- Tags: @e2e @admin-privileges @priority-P2 @risk-med @happy

## Preconditions
- The admin user is logged in
- The admin-only pages are accessible
