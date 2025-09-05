# Email Verification with Invalid Hash
Feature: authentication — email-verification
  Background:
    Given a user has registered and received a verification email

  Scenario: User verifies email with an invalid hash
    Given the user clicks the verification link with an invalid hash
    When the verification endpoint is called
    Then the verification should fail with an error message

## Traceability
- Code refs: services/users.js:201-317
- API refs: GET /services/verifyemail/:id/:verificationHash
- Feature area: authentication
- Requirement: email-verification
- Tags: @e2e @authentication @priority-P2 @risk-med @negative

## Preconditions
- The user has an invalid verification hash
- The verification endpoint is accessible
