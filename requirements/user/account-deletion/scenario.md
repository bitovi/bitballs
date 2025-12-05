# Account Deletion

Feature: Delete user account

  Scenario: User deletes their own account
    Given I am logged in
    When I navigate to my account page
    And I click the "DELETE ACCOUNT" button
    Then my account should be deleted
    And I should be logged out
    And I should be redirected to the login page

  Scenario: Admin cannot delete their own account if they are the only admin
    Given I am logged in as the only admin
    When I navigate to my account page
    And I try to delete my account
    Then I should see an error message
    And my account should not be deleted

  Scenario: User confirms account deletion
    Given I am logged in
    When I navigate to my account page
    And I click the "DELETE ACCOUNT" button
    Then I should see a confirmation dialog
    When I confirm the deletion
    Then my account should be deleted
