Feature: View Tournament List
  As a user
  I want to view a list of all tournaments
  So that I can select a tournament to view details

Scenario: View tournament list
  Given I am on the tournaments list page
  When the page loads
  Then I should see a list of all tournaments with basic information
