# Session Menu Navigation

Feature: Session-specific navigation and authentication

  Scenario: Admin user sees admin-only navigation
    Given I am logged in as an admin
    When I view the navigation menu
    Then I should see the "Users" link
    And I should see the "Account" link
    And I should see the "Logout" link

  Scenario: Non-admin user sees standard navigation
    Given I am logged in as a non-admin user
    When I view the navigation menu
    Then I should not see the "Users" link
    And I should see the "Account" link
    And I should see the "Logout" link

  Scenario: Non-logged-in user sees login form
    Given I am not logged in
    When I view the navigation menu
    Then I should see a "Login" dropdown
    And I should not see admin or user-specific links

  Scenario: User logs in via navigation
    Given I am not logged in
    When I click the "Login" dropdown
    And I enter valid credentials
    And I submit the login form
    Then I should be logged in
    And the navigation should update to show logged-in user options

  Scenario: User logs in with invalid credentials via navigation
    Given I am not logged in
    When I click the "Login" dropdown
    And I enter invalid credentials
    And I submit the login form
    Then I should see an error message
    And I should remain logged out

  Scenario: User clicks register link from navigation
    Given I am not logged in
    When I click the "Login" dropdown
    And I click the "or register" link
    Then I should be taken to the registration page
