# Stat Time Tracking

Feature: Track stats with precise timing

  Scenario: Admin adds stat with specific time
    Given I am logged in as an admin
    And I am viewing a game with a video
    When I click on a player
    And I enter stat details including a specific time
    And I save the stat
    Then the stat should be recorded at that exact time
    And it should appear on the timeline at the correct position

  Scenario: Admin adjusts stat time with quick buttons
    Given I am adding a stat
    When I use the "+2 s" button
    Then the time should increase by 2 seconds
    When I use the "-10 s" button
    Then the time should decrease by 10 seconds
    And the time should not go below 0

  Scenario: Stat time automatically syncs with video
    Given I am viewing a game video
    When I pause the video and click on a player
    Then the stat time should automatically be set to the current video time
    When I manually adjust the time
    Then the stat should use the manually entered time

  Scenario: View stats at specific time in video
    Given there are stats recorded at various times
    When I seek to a specific time in the video
    Then I should see only the stats that occurred up to that time
    And future stats should not be visible

  Scenario: Stat time validation
    Given I am adding a stat
    When I enter a time that exceeds the video duration
    Then I should see an error message
    And the stat should not be saved
    When I enter a negative time
    Then the time should be automatically set to 0
