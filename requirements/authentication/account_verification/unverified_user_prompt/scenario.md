Feature: Account Verification
  As a newly registered user
  I want to be prompted to verify my account
  So that I can complete my registration

Scenario: Unverified user prompt
  Given I have registered but not verified my account
  When I log in
  Then I should see a prompt to verify my account
  And I should not have access to admin features
