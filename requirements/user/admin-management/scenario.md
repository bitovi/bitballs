# Admin User Management

Feature: Admin manages user privileges

  Scenario: Admin views list of all users
    Given I am logged in as an admin
    When I navigate to the users page
    Then I should see a table of all users
    And I should see each user's ID, email, verification status, and admin status

  Scenario: Admin grants admin privileges to a user
    Given I am logged in as an admin
    And there is a non-admin user
    When I navigate to the users page
    And I check the admin checkbox for that user
    Then that user should be granted admin privileges
    And they should be able to access admin features

  Scenario: Admin revokes admin privileges from a user
    Given I am logged in as an admin
    And there is another admin user
    When I navigate to the users page
    And I uncheck the admin checkbox for that user
    Then that user should lose admin privileges
    And they should no longer be able to access admin features

  Scenario: Admin cannot change their own admin status
    Given I am logged in as an admin
    When I navigate to the users page
    Then I should not be able to modify my own admin checkbox
    And my admin status should be displayed as read-only

  Scenario: Non-admin user cannot access users page
    Given I am logged in as a non-admin user
    When I try to navigate to the users page
    Then I should be denied access
    And I should see an error message
