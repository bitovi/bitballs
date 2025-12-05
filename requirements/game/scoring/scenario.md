# Game Scoring System

Feature: Track and display game scores

  Scenario: View current score during game
    Given there is a game with stats recorded
    When I view the game details
    Then I should see the current score for both teams
    And the score should reflect stats up to the current video time

  Scenario: View final score of completed game
    Given there is a completed game
    When I view the game details
    Then I should see the final score for both teams
    And the final score should reflect all recorded stats

  Scenario: Score updates as video progresses
    Given I am watching a game video with stats
    When the video plays forward
    Then the current score should update to reflect stats up to that time
    When I seek backward in the video
    Then the current score should update to reflect the earlier time

  Scenario: Score calculation with different stat types
    Given there is a game with various stat types (points, fouls, etc.)
    When I view the game scores
    Then only scoring stats should be counted toward the score
    And other stats should not affect the score calculation

  Scenario: Score display for game without stats
    Given there is a game with no recorded stats
    When I view the game details
    Then both current and final scores should show 0-0
    And score displays should be visible but empty
