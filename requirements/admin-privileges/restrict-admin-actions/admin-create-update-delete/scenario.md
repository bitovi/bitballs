# Restrict Create/Update/Delete to Admins
Feature: admin-privileges — restrict-admin-actions
  Background:
    Given a non-admin user is logged in

  Scenario: Non-admin attempts to create, update, or delete entities
    Given the non-admin user attempts to create, update, or delete a player, team, game, tournament, or stat
    When the non-admin submits the action
    Then the action should fail with an error indicating admin privileges are required

## Traceability
- Code refs: services/* (adminOnly middleware)
- API refs: POST/PUT/DELETE on /services/*
- Feature area: admin-privileges
- Requirement: restrict-admin-actions
- Tags: @e2e @admin-privileges @priority-P1 @risk-high @negative

## Preconditions
- The non-admin user is logged in
- The relevant entity pages are accessible
