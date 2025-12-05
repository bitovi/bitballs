# Email Verification

Feature: Verify user email address

  Scenario: New user registers and receives verification email
    Given I register with a valid email
    When my account is created
    Then I should receive a verification email
    And my account status should be "pending"
    And I should see a message about checking my email

  Scenario: User clicks verification link in email
    Given I have a pending account
    When I click the verification link in my email
    Then my account should be verified
    And my account status should be "verified"
    And I should be able to log in normally

  Scenario: User with pending account tries to log in
    Given I have a pending account
    When I try to log in
    Then I should see a message about verifying my email
    And I should not be logged in

  Scenario: User with verified account sees verified status
    Given I have a verified account
    When I view my account page
    Then I should see a "verified!" indicator next to my email
    And my email field should be disabled from editing
