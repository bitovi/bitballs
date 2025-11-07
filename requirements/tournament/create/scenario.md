# Tournament Creation

Feature: Create a new tournament

  Scenario: Admin creates a tournament with valid details
    Given I am logged in as an admin
    When I navigate to the tournaments page
    And I fill in a valid tournament date
    And I submit the tournament creation form
    Then a new tournament should be created
    And I should see the tournament in the tournament list
    And the tournament year should be derived from the date

  Scenario: Admin creates a tournament with invalid date
    Given I am logged in as an admin
    When I navigate to the tournaments page
    And I fill in an invalid tournament date
    And I submit the tournament creation form
    Then I should see an error message about the invalid date
    And the tournament should not be created

  Scenario: Admin creates a tournament with duplicate year
    Given I am logged in as an admin
    And another tournament exists for the same year
    When I navigate to the tournaments page
    And I fill in a date for that same year
    And I submit the tournament creation form
    Then I should see an error message about the year already existing
    And the tournament should not be created

  Scenario: Non-admin user cannot see tournament creation form
    Given I am logged in as a non-admin user
    When I navigate to the tournaments page
    Then I should not see the tournament creation form
    And I should only see the list of existing tournaments

  Scenario: Non-logged-in user views tournaments
    Given I am not logged in
    When I navigate to the tournaments page
    Then I should see the list of existing tournaments
    And I should not see the tournament creation form
