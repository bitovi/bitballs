# Main Navigation Menu

Feature: Navigate between main sections

  Scenario: User navigates to tournaments page
    Given I am on any page
    When I click the "Tournaments" link in the main navigation
    Then I should be taken to the tournaments list page
    And the "Tournaments" navigation item should be highlighted as active

  Scenario: User navigates to players page
    Given I am on any page
    When I click the "Players" link in the main navigation
    Then I should be taken to the players list page
    And the "Players" navigation item should be highlighted as active

  Scenario: User clicks the BitBalls logo
    Given I am on any page
    When I click the "BitBalls" logo
    Then I should be taken to the home page

  Scenario: Navigation highlights current page
    Given I am on the tournaments page
    Then the "Tournaments" navigation item should be highlighted as active
    And other navigation items should not be highlighted
