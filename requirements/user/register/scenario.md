# User Registration

Feature: Register a new user

  Scenario: User registers with valid credentials
    Given I am on the registration page
    When I enter a valid email and password
    And I submit the registration form
    Then my user account should be created with "pending" status
    And I should receive a verification email
    And I should see a message about verifying my email

  Scenario: User registers with an invalid email format
    Given I am on the registration page
    When I enter an invalid email format and a valid password
    And I submit the registration form
    Then I should see an error message about the email format
    And my account should not be created

  Scenario: User registers with a weak password
    Given I am on the registration page
    When I enter a valid email and a weak password
    And I submit the registration form
    Then I should see an error message about password requirements
    And my account should not be created

  Scenario: User registers with an email that is already taken
    Given I am on the registration page
    And an account already exists with my email
    When I enter the same email and a valid password
    And I submit the registration form
    Then I should see an error message about the email being in use
    And my account should not be created

  Scenario: User accesses registration from navigation
    Given I am not logged in
    When I click the "Login" dropdown in the navigation
    And I click the "or register" link
    Then I should be taken to the registration page
    And I should see the registration form
