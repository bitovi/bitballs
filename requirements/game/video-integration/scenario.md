# Game Video Integration

Feature: Integrate YouTube videos with game playback

  Scenario: Admin adds YouTube URL to game
    Given I am logged in as an admin
    When I create or edit a game
    And I enter a valid YouTube URL
    And I save the game
    Then the YouTube video should be embedded in the game details
    And the video should be ready for playback

  Scenario: User watches game video with stats overlay
    Given there is a game with a YouTube video and stats
    When I view the game details
    Then I should see the video player
    And I should see stat markers overlaid on the timeline
    When I click on a stat marker
    Then the video should jump to that timestamp

  Scenario: Video playback synchronizes with stats
    Given I am viewing a game with video and stats
    When the video plays
    Then stat markers should highlight at the appropriate times
    And the current time should be displayed

  Scenario: Invalid YouTube URL handling
    Given I am logged in as an admin
    When I enter an invalid YouTube URL for a game
    And I save the game
    Then I should see an error message about the invalid URL
    And the game should not be saved with the invalid URL

  Scenario: Game without video shows placeholder
    Given there is a game without a YouTube video
    When I view the game details
    Then I should see a placeholder or message indicating no video is available
    And I should still be able to view stats and other game information
