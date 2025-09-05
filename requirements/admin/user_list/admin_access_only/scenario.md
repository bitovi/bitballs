Feature: Admin User List Access
  As an admin user
  I want to view the list of all users
  So that I can manage user accounts

Scenario: Admin access only
  Given I am logged in as an admin
  When I navigate to the user list page
  Then I should see the list of all users

Scenario: Non-admin access
  Given I am logged in as a non-admin user
  When I navigate to the user list page
  Then I should see an error message "Access denied"
  And I should not see the user list
