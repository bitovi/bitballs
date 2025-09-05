# Email Verification with Valid Hash
Feature: authentication — email-verification
  Background:
    Given a user has registered and received a verification email

  Scenario: User verifies email with a valid hash
    Given the user clicks the verification link with a valid hash
    When the verification endpoint is called
    Then the user's account should be marked as verified and redirected to the account page

## Traceability
- Code refs: services/users.js:201-317
- API refs: GET /services/verifyemail/:id/:verificationHash
- Feature area: authentication
- Requirement: email-verification
- Tags: @e2e @authentication @priority-P1 @risk-high @happy

## Preconditions
- The user has a valid verification hash
- The verification endpoint is accessible
