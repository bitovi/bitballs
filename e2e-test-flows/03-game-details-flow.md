# Game Details Flow - E2E Test Documentation

## Overview

The Bitballs application provides comprehensive game viewing and statistics tracking functionality. The game details page is the core feature allowing users to watch YouTube videos of games while viewing and managing real-time statistics synced with the video timeline.

## Test Flow: View Game Details (Non-Admin User)

### Entry Point

- **URL**: `http://localhost:5001/games/{gameId}`
- **Navigation**:
  - Click on a game link from a tournament details page
  - Or directly navigate to a specific game URL

### Test Steps

1. **Navigate to Game Details Page**

   - Click on a game from tournament page or other link
   - Verify URL changes to `/games/{gameId}`
   - Verify page title shows "BitBalls | Game"

2. **View Game Information**

   - Verify game metadata is displayed:
     - Tournament name (with link to tournament)
     - Round (e.g., "Round 1", "Semi Finals", "Championship")
     - Court (e.g., "1", "2", "3", "4")
     - Teams playing (Home vs Away)

3. **View Team Information**

   - Verify both teams are displayed:
     - **Home Team**:
       - Team name/color
       - List of 4 players (clickable links)
     - **Away Team**:
       - Team name/color
       - List of 4 players (clickable links)

4. **View YouTube Video Player**

   - Verify embedded YouTube video is present
   - Verify video player ID matches game's `videoUrl` field
   - Test video controls:
     - Play/Pause
     - Volume control
     - Seek/scrub through timeline
     - Fullscreen mode
   - Verify autoplay starts video automatically (if configured)

5. **View Current Score Display**

   - Verify live score is shown during video playback
   - Score should update as video plays through stat events
   - Format: "Home Score - Away Score"
   - Verify score calculation:
     - 1P stats add 1 point
     - 2P stats add 2 points
   - Pause video and scrub timeline
   - Verify score updates based on current video time

6. **View Final Score**

   - Verify final score is displayed
   - Final score should reflect all stats in the game
   - Compare with current score when video is at end

7. **View Game Statistics**

   - Verify stats are organized by player
   - Each player should have a row/section showing their stats
   - Stats should be displayed in chronological order (by time)
   - Each stat entry should show:
     - Time in video (e.g., "2:35")
     - Stat type (1P, 2P, 1PA, 2PA, ORB, DRB, Ast, Stl, Blk, To)
     - Visual indicator on timeline

8. **Test Stat Timeline Visualization**

   - Verify visual timeline shows stat events
   - Each stat should appear as a marker/dot on timeline
   - Markers should be positioned proportionally to video duration
   - Formula: `position = (stat.time / videoDuration) * 100%`
   - Verify different stat types have different visual indicators

9. **Test Stat Click/Interaction (Non-Admin)**

   - Click on a stat in the timeline or list
   - Expected: Video seeks to 5 seconds before that stat time
   - Verify video playback starts from that point
   - This helps review the play that led to the stat

10. **Test Player Links**

    - Click on a player name
    - Verify navigation to player details page
    - Use back button to return to game
    - Verify video state is reset (reloads)

11. **Test Tournament Link**
    - Click on tournament name/link
    - Verify navigation to tournament details page
    - Use back button to return to game

### Expected Page Structure

```html
<game-details>
  <!-- Game Info Header -->
  <div class="game-header">
    <h2><a href="/tournaments/{id}">Tournament Name</a></h2>
    <p>Round: Championship | Court: 1</p>
  </div>

  <!-- Teams Display -->
  <div class="teams">
    <div class="home-team">
      <h3>Home Team (Blue)</h3>
      <ul>
        <li><a href="/players/1">Player 1</a></li>
        <li><a href="/players/2">Player 2</a></li>
        <li><a href="/players/3">Player 3</a></li>
        <li><a href="/players/4">Player 4</a></li>
      </ul>
    </div>
    <div class="away-team">
      <h3>Away Team (Red)</h3>
      <ul>
        <li><a href="/players/5">Player 5</a></li>
        <!-- ... -->
      </ul>
    </div>
  </div>

  <!-- Scores -->
  <div class="scores">
    <div class="current-score">Current: 12 - 15</div>
    <div class="final-score">Final: 21 - 18</div>
  </div>

  <!-- YouTube Player -->
  <div id="youtube-player"></div>

  <!-- Stats Timeline -->
  <div class="stats-container" data-player-id="1">
    <div class="stat-marker" style="left: 25.5%">1P</div>
    <div class="stat-marker" style="left: 48.2%">2P</div>
    <!-- ... -->
  </div>

  <!-- Current Time Cursor -->
  <div class="time-cursor" style="left: 35%; height: 600px;"></div>
</game-details>
```

### Score Calculation Logic

**Current Score** (updates with video time):

```javascript
stats.forEach((stat) => {
  if (stat.time <= currentVideoTime) {
    if (stat.type === "1P") {
      score[homeOrAway]++;
    } else if (stat.type === "2P") {
      score[homeOrAway] += 2;
    }
  }
});
```

**Final Score** (all stats):

```javascript
stats.forEach((stat) => {
  if (stat.type === "1P") {
    score[homeOrAway]++;
  } else if (stat.type === "2P") {
    score[homeOrAway] += 2;
  }
});
```

## Test Flow: Manage Game Statistics (Admin User)

### Prerequisites

- User must be logged in as admin
- Game must have video URL configured
- Video must be playable

### Test Steps

1. **Admin-Specific UI Elements**

   - Login as admin user
   - Navigate to game details page
   - Verify additional admin controls are visible:
     - Player rows are clickable
     - Stat items have delete buttons
     - Time adjustment controls visible

2. **Create New Stat - Show Stat Menu**

   - As admin, click on a player row during video playback
   - Expected outcomes:
     - Video pauses automatically
     - Stat creation form/menu appears
     - Current video time is captured
     - Selected player is pre-populated

3. **View Stat Creation Form**

   - Verify form displays:
     - Player name (read-only, pre-selected)
     - Current time (captured from video)
     - Stat type dropdown/selector with options:
       - 1P (1 Point - Free throw made)
       - 1PA (1 Point Attempt - Free throw missed)
       - 2P (2 Points - Field goal made)
       - 2PA (2 Point Attempt - Field goal missed)
       - ORB (Offensive Rebound)
       - DRB (Defensive Rebound)
       - Ast (Assist)
       - Stl (Steal)
       - Blk (Block)
       - To (Turnover)
     - Time adjustment buttons (+/- seconds)
     - Save button
     - Cancel button

4. **Test Time Adjustment Before Creating Stat**

   - With stat form open, test time adjustment buttons:
     - Click "-10s" button → video seeks backward 10 seconds
     - Click "-2s" button → video seeks backward 2 seconds
     - Click "+2s" button → video seeks forward 2 seconds
     - Click "+10s" button → video seeks forward 10 seconds
   - Verify stat time updates with video position
   - Verify time is always rounded to nearest integer

5. **Test Create Stat - Select Type and Save**

   - Select stat type: "2P" (2 point field goal)
   - Click "Save" or "Add" button
   - Expected outcomes:
     - Stat is saved to database via `POST /services/stats`
     - New stat appears in player's stat timeline
     - Stat marker appears at correct position
     - Stat form closes
     - Success message may appear
     - Video remains paused (or behavior is consistent)

6. **Test Create Stat - Cancel**

   - Click on player row to open stat form
   - Select a stat type
   - Click "Cancel" button
   - Expected outcomes:
     - Stat form closes
     - No stat is created
     - No API call is made
     - Video remains paused

7. **Test Multiple Stats for Same Player**

   - Click on same player multiple times
   - Create several different stat types at different times
   - Verify all stats appear in chronological order
   - Verify timeline shows all stat markers

8. **Test Stats for Different Players**

   - Create stats for multiple players
   - Verify each player's row shows only their stats
   - Verify stats are isolated per player

9. **Test Stat Validation**

   - Try to create stat without selecting type
   - Expected: Validation error or disabled save button
   - Test any other required fields

10. **Delete Existing Stat**

    - As admin, locate a stat marker or stat in list
    - Click delete/trash icon on the stat
    - Expected: Confirmation dialog appears
    - Verify dialog message: "Are you sure you want to delete this stat?"

11. **Test Delete Confirmation**

    - Click delete on a stat
    - In confirmation dialog, click "Cancel"
    - Expected: Dialog closes, stat is NOT deleted

12. **Test Successful Stat Deletion**

    - Click delete on a stat
    - In confirmation dialog, click "OK"
    - Expected outcomes:
      - Stat is removed from timeline immediately
      - Stat is removed from database via `DELETE /services/stats/{id}`
      - Stat marker disappears
      - Scores are recalculated (if 1P or 2P stat)
      - Current and final scores update

13. **Test Score Recalculation After Delete**
    - Note current final score
    - Delete a "2P" stat
    - Verify final score decreases by 2 points
    - Verify current score updates if viewing that time period

## Test Flow: Video Synchronization

### Test Steps

1. **Test Initial Load and Autoplay**

   - Navigate to game page
   - Verify YouTube player loads
   - Verify video autoplays (if autoplay=true)
   - If autoplay fails (browser policy), verify play button works

2. **Test Current Time Cursor**

   - Watch video play
   - Verify visual cursor moves across stat timelines
   - Cursor should align with current video time
   - Cursor height should span all player rows
   - Position formula: `left = (currentTime / duration) * 100%`

3. **Test Current Score Updates During Playback**

   - Start video from beginning
   - Watch score update as video plays through stat events
   - Pause at various points and verify score is accurate
   - Score should only include stats where `stat.time <= currentTime`

4. **Test Scrubbing Video Timeline**

   - Drag video scrubber to different positions
   - Verify current score updates immediately
   - Verify time cursor position updates
   - Verify scrubbing is smooth (updates at 50ms intervals when playing)

5. **Test Seeking to Stat Events**

   - Click on a stat marker or stat in list
   - Verify video seeks to 5 seconds before stat time
   - This allows viewing the play leading to the stat
   - Verify video starts playing automatically

6. **Test Video State Changes**

   - Play video → verify cursor moves smoothly
   - Pause video → verify cursor stops moving
   - When paused, verify cursor still updates if user scrubs
   - When paused, cursor updates every 300ms (less frequently)
   - When playing, cursor updates every 50ms (smoother)

7. **Test Video Duration Loading**
   - Verify video duration is fetched after player ready
   - Verify stat positions are calculated correctly
   - Test with videos of different lengths

## Test Flow: Real-time Stats Updates (If Implemented)

### Test Steps

1. **Test Multi-User Scenario**

   - Open game in two browser windows
   - Login as admin in one window
   - In admin window, create a new stat
   - Expected: New stat appears in both windows (real-time update)
   - Note: This depends on real-time functionality being implemented

2. **Test Stat Deletion Real-time**
   - In admin window, delete a stat
   - Expected: Stat disappears in both windows
   - Scores update in both windows

## API Endpoints Tested

- `GET /services/games/{id}?withRelated[]=stats&withRelated[]=tournament&withRelated[]=homeTeam.player1&...` - Get game with all related data
- `GET /services/stats?where[gameId]={gameId}` - Get stats for a game
- `POST /services/stats` - Create new stat (admin only)
  - Body: `{playerId, gameId, type, time}`
- `DELETE /services/stats/{id}` - Delete stat (admin only)

## Related Data Relationships

### Game Data Structure

```json
{
  "id": 1,
  "tournamentId": 1,
  "tournament": { "id": 1, "name": "Summer League" },
  "homeTeamId": 1,
  "awayTeamId": 2,
  "homeTeam": {
    "id": 1,
    "name": "Blue Team",
    "player1Id": 1,
    "player1": { "id": 1, "name": "John Doe" },
    "player2": {...},
    "player3": {...},
    "player4": {...}
  },
  "awayTeam": {...},
  "round": "Championship",
  "court": "1",
  "videoUrl": "dQw4w9WgXcQ",
  "stats": [
    {
      "id": 1,
      "playerId": 1,
      "gameId": 1,
      "type": "2P",
      "time": 45
    }
  ]
}
```

### Stat Types Reference

| Code | Name              | Description              | Points |
| ---- | ----------------- | ------------------------ | ------ |
| 1P   | One Point         | Free throw made          | +1     |
| 1PA  | One Point Attempt | Free throw missed        | 0      |
| 2P   | Two Points        | Field goal made          | +2     |
| 2PA  | Two Point Attempt | Field goal missed        | 0      |
| ORB  | Offensive Rebound | Rebound on offensive end | 0      |
| DRB  | Defensive Rebound | Rebound on defensive end | 0      |
| Ast  | Assist            | Pass leading to score    | 0      |
| Stl  | Steal             | Stole ball from opponent | 0      |
| Blk  | Block             | Blocked opponent's shot  | 0      |
| To   | Turnover          | Lost possession          | 0      |

## Edge Cases to Test

1. **Game with No Video URL**

   - Navigate to game without videoUrl
   - Verify appropriate error message or placeholder
   - Verify stats can still be viewed
   - Admin cannot create stats without video

2. **Game with Invalid Video URL**

   - Game has invalid YouTube ID
   - Verify YouTube player shows error
   - Verify page doesn't crash

3. **Game with No Stats**

   - View game with zero statistics
   - Verify empty state is displayed
   - Verify scores show 0-0
   - Admin can create first stat

4. **Game with Many Stats (100+)**

   - Test performance with large number of stats
   - Verify timeline remains responsive
   - Verify score calculations are correct
   - Check for any UI slowdowns

5. **Stat at Time 0**

   - Create stat at exactly 0:00
   - Verify stat appears at start of timeline
   - Verify position calculation handles zero

6. **Stat at End of Video**

   - Create stat at video duration
   - Verify stat appears at end of timeline
   - Verify position is 100%

7. **Rapid Stat Creation**

   - Create multiple stats quickly in succession
   - Verify all stats are saved
   - Check for race conditions
   - Verify timeline updates correctly

8. **Very Long Video (2+ hours)**

   - Test with lengthy video
   - Verify time calculations remain accurate
   - Check performance of cursor updates

9. **Mobile/Touch Interactions**
   - Test on mobile viewport
   - Verify video player responsive
   - Verify stat creation works on touch
   - Check timeline visibility

## Permission Testing

### Non-Admin User

- ✅ Can view game details
- ✅ Can watch video
- ✅ Can see all stats
- ✅ Can click stats to seek video
- ✅ Can see current and final scores
- ❌ Cannot click player rows to create stats
- ❌ Cannot see stat delete buttons
- ❌ Cannot see time adjustment controls
- ❌ Cannot create or delete stats via API

### Admin User

- ✅ All non-admin capabilities
- ✅ Can click player rows to create stats
- ✅ Can adjust time before creating stat
- ✅ Can select stat type and save
- ✅ Can delete existing stats
- ✅ Can create multiple stats per player
- ✅ Stats persist to database

## Performance Considerations

1. **YouTube API Loading**

   - YouTube IFrame API loads asynchronously
   - Player initialization may take 1-3 seconds
   - Verify loading state is handled gracefully

2. **Cursor Position Updates**

   - Playing: Updates every 50ms (20 FPS)
   - Paused: Updates every 300ms
   - Verify no performance issues with frequent updates

3. **Stat Rendering**

   - With many stats, verify DOM rendering is efficient
   - Consider virtualization for 500+ stats

4. **Score Recalculation**
   - Scores recalculated on every time update
   - Verify calculation is fast (should be O(n))

## Accessibility Testing

1. **Keyboard Controls**

   - Tab through interactive elements
   - Space bar to play/pause video
   - Arrow keys to seek video (YouTube default)
   - Enter to activate buttons

2. **Screen Reader**

   - Verify game info is announced
   - Verify scores are accessible
   - Verify stat events are meaningful
   - Verify form labels are proper

3. **Visual Accessibility**
   - Verify sufficient contrast for stat markers
   - Verify color is not only indicator (use shapes/icons too)
   - Test with high contrast mode

## Success Criteria

✅ Game details page loads with all related data  
✅ YouTube video player embeds and plays correctly  
✅ Current score updates in real-time with video playback  
✅ Final score displays correctly based on all stats  
✅ Stat timeline markers positioned accurately  
✅ Clicking stats seeks video to 5 seconds before event  
✅ Admin users can click player rows to create stats  
✅ Stat creation form captures current video time  
✅ Admin can adjust time before saving stat  
✅ Stats save successfully to database  
✅ Admin can delete stats with confirmation  
✅ Scores recalculate after stat deletion  
✅ Non-admin users cannot access stat management  
✅ Visual cursor tracks current video time  
✅ Page handles edge cases gracefully (no video, no stats, etc.)  
✅ Performance remains acceptable with many stats  
✅ Real-time updates work across multiple clients (if implemented)
