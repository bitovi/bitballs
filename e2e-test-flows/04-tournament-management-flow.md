# Tournament Management Flow - E2E Test Documentation

## Overview

The Bitballs application provides comprehensive tournament management functionality. Tournaments are the top-level organizational structure containing teams, games, and statistics. The application supports tournament listing, detailed views with game scheduling, team management, and player statistics aggregation.

## Test Flow: Tournament List View

### Entry Point

- **URL**: `http://localhost:5001/` or `http://localhost:5001/tournaments`
- **Navigation**: Default landing page or click "Tournaments" in navigation

### Test Steps

1. **Navigate to Tournament List**

   - Access the home page (defaults to tournaments)
   - Or click "Tournaments" link in navigation
   - Verify URL is `/tournaments` or `/`
   - Verify page title shows "BitBalls | Tournaments"

2. **View Tournament List (Non-Admin User)**

   - Verify list of tournaments is displayed
   - Tournaments should be ordered by date
   - Each tournament entry should show:
     - Tournament name (clickable link)
     - Tournament date
   - Verify NO create/delete controls visible

3. **View Tournament List (Admin User)**

   - Login as admin user
   - Navigate to tournaments page
   - Verify create tournament form is visible
   - Verify each tournament has delete button/icon

4. **Test Empty State**

   - If no tournaments exist:
     - Verify appropriate message displayed
     - Admin should still see create form

5. **Click on Tournament**
   - Click on any tournament name/link
   - Verify navigation to tournament details page
   - Verify URL changes to `/tournaments/{tournamentId}`

### Expected Elements

```html
<tournament-list>
  <!-- Create Form (Admin Only) -->
  <form class="create-tournament">
    <input type="text" name="name" placeholder="Tournament Name" />
    <input type="date" name="date" placeholder="Date" />
    <button type="submit">Create Tournament</button>
  </form>

  <!-- Tournament List -->
  <ul class="tournament-list">
    <li class="tournament-item">
      <a href="/tournaments/1">Summer League 2023</a>
      <span class="date">September 4, 2023</span>
      <button class="delete-btn">Delete</button>
      <!-- Admin only -->
    </li>
  </ul>
</tournament-list>
```

## Test Flow: Create Tournament (Admin Only)

### Prerequisites

- User must be logged in as admin

### Entry Point

- **URL**: `http://localhost:5001/tournaments`
- **Action**: Use create tournament form at top of page

### Test Steps

1. **Access Create Tournament Form**

   - As admin, navigate to tournaments page
   - Verify form contains:
     - Tournament name input (required)
     - Tournament date input (required)
     - "Create Tournament" submit button

2. **Test Form Validation - Missing Name**

   - Leave name field empty
   - Enter valid date
   - Click "Create Tournament"
   - Expected: Validation error or disabled submit

3. **Test Form Validation - Missing Date**

   - Enter valid name
   - Leave date field empty
   - Click "Create Tournament"
   - Expected: Server responds with 400 error
   - Error message: "Cannot create a tournament without a date"

4. **Test Successful Tournament Creation**

   - Enter name: "Fall League 2024"
   - Enter date: "10/15/2024"
   - Click "Create Tournament"
   - Expected outcomes:
     - Tournament is saved to database
     - Success message may appear
     - New tournament appears in list
     - Form is cleared (ready for another entry)
     - Tournament list re-sorts by date

5. **Verify Tournament Appears in List**
   - After creation, verify tournament is in list
   - Verify it's sorted correctly by date
   - Verify it's clickable

### Expected API Calls

- `POST /services/tournaments`
  - Body: `{name: "Fall League 2024", date: "2024-10-15"}`
  - Success Response: `{id: 3, name: "...", date: "..."}`
  - Error Response (400): `{type: "Bad Request", message: "Cannot create a tournament without a date"}`

## Test Flow: Delete Tournament (Admin Only)

### Prerequisites

- User must be logged in as admin
- At least one tournament must exist

### Test Steps

1. **Initiate Tournament Deletion**

   - As admin, locate delete button next to a tournament
   - Click delete button/icon
   - Verify confirmation dialog appears

2. **Test Confirmation Dialog**

   - Verify message: "Are you sure you want to delete this tournament?"
   - Verify "OK" button present
   - Verify "Cancel" button present

3. **Test Delete Cancellation**

   - Click delete button
   - In dialog, click "Cancel"
   - Expected: Tournament is NOT deleted
   - Tournament remains in list

4. **Test Successful Deletion**

   - Click delete button
   - In dialog, click "OK"
   - Expected outcomes:
     - Tournament removed from list immediately
     - Database record deleted
     - Associated data handling (teams, games, stats)

5. **Test Delete with Associated Data**
   - Delete tournament that has teams and games
   - Verify behavior:
     - Option A: Deletion prevented (foreign key constraints)
     - Option B: Cascading delete removes teams/games/stats
     - Document actual behavior observed

## Test Flow: Tournament Details View

### Entry Point

- **URL**: `http://localhost:5001/tournaments/{tournamentId}`
- **Navigation**: Click on tournament from list

### Test Steps

1. **Navigate to Tournament Details**

   - Click on a tournament from the list
   - Verify URL changes to `/tournaments/{tournamentId}`
   - Verify page title shows "BitBalls | Tournament"

2. **View Tournament Header Information**

   - Verify tournament name displayed as heading
   - Verify tournament date displayed
   - Verify tournament year extracted from date

3. **View Games Section**

   - Verify games are displayed in a grid/table
   - Games should be organized by:
     - **Rows**: Rounds (Round 1, Round 2, ..., Semi Finals, Championship)
     - **Columns**: Courts (1, 2, 3, 4)
   - Each game cell should show:
     - Home team color/name
     - Away team color/name
     - "vs" or similar separator
     - Video icon (if videoUrl exists)
     - Link to game details

4. **View Game Grid Structure**

   - Verify only rounds with games are displayed
   - Empty rounds should not show
   - If a court has no game for a round, cell should be empty
   - Verify grid is responsive on different screen sizes

5. **Click on Game**

   - Click on any game in the grid
   - Verify navigation to game details page
   - Verify URL changes to `/games/{gameId}`

6. **View Teams Section**

   - Verify all teams for the tournament are listed
   - Each team entry should show:
     - Team color (visual indicator)
     - Team name or "Team {color}"
     - List of 4 players (clickable links)
   - Teams should be visually distinguished by color

7. **View Player Statistics Aggregation**

   - Verify statistics are aggregated per player across all tournament games
   - Each player should show:
     - Player name (clickable link)
     - Total points (TP)
     - Each stat type count:
       - 1P (Free throws made)
       - 1PA (Free throw attempts)
       - 2P (Field goals made)
       - 2PA (Field goal attempts)
       - ORB (Offensive rebounds)
       - DRB (Defensive rebounds)
       - Ast (Assists)
       - Stl (Steals)
       - Blk (Blocks)
       - To (Turnovers)
     - Field goal percentage (FG%)

8. **Test Statistics Calculations**

   - Verify Total Points (TP) = (1P × 1) + (2P × 2)
   - Verify FG% = (1P + 2P) / (1P + 2P + 1PA + 2PA) × 100
   - Verify FG% shows "-" when no attempts
   - Verify percentages formatted as "XX%"

9. **Click on Player from Team**

   - Click on a player name
   - Verify navigation to player details page
   - Use back button to return

10. **Test Empty States**
    - View tournament with no games: Verify appropriate message
    - View tournament with no teams: Verify empty state
    - View tournament with teams but no stats: Verify 0 values

## Test Flow: Create Team (Admin Only)

### Prerequisites

- User must be logged in as admin
- At least one player must exist in database

### Entry Point

- **URL**: `http://localhost:5001/tournaments/{tournamentId}`
- **Action**: Use "Create Team" form in teams section

### Test Steps

1. **Access Create Team Form**

   - As admin, navigate to tournament details
   - Scroll to teams section
   - Verify create team form is visible
   - Form should contain:
     - Team color selector (dropdown/select)
     - Player 1 selector (dropdown, required)
     - Player 2 selector (dropdown, required)
     - Player 3 selector (dropdown, required)
     - Player 4 selector (dropdown, required)
     - "Create Team" submit button

2. **View Available Colors**

   - Open color selector
   - Verify only unused colors are available
   - Colors already used by teams should not appear
   - Available colors from `Team.colors` array:
     - Blue, Red, Green, Yellow, Purple, Orange, Pink, etc.

3. **Select Team Color**

   - Select color: "Blue"
   - Verify selection is highlighted
   - Or verify form auto-selects first available color

4. **Select Players for Team**

   - **Player 1 Selector**:
     - Open dropdown
     - Verify all available players listed
     - Select: "Player A"
   - **Player 2 Selector**:
     - Open dropdown
     - Verify "Player A" is NOT in list (already selected)
     - Verify players on other teams are NOT in list
     - Select: "Player B"
   - **Player 3 Selector**:
     - Verify "Player A" and "Player B" not available
     - Select: "Player C"
   - **Player 4 Selector**:
     - Verify previously selected players not available
     - Select: "Player D"

5. **Test Player Availability Logic**

   - Verify same player cannot be selected twice on one team
   - Verify players already on other teams are not available
   - Verify available players update dynamically as selections change

6. **Test Team Creation - Missing Players**

   - Leave one or more player selectors empty
   - Click "Create Team"
   - Expected: Validation error or players default to available options

7. **Test Successful Team Creation**

   - Select color: "Blue"
   - Select all 4 players
   - Click "Create Team"
   - Expected outcomes:
     - Team is saved to database with tournament association
     - New team appears in teams list
     - Team color visual indicator displayed
     - Form is cleared or hidden
     - Selected players no longer available for other teams
     - Color "Blue" no longer available for selection

8. **Verify Maximum Teams**
   - Create teams until all colors are used
   - Verify create form disabled or hidden when no colors available
   - Or verify appropriate message displayed

### Expected Data Structure

```json
{
  "id": 1,
  "tournamentId": 1,
  "color": "Blue",
  "player1Id": 1,
  "player2Id": 2,
  "player3Id": 3,
  "player4Id": 4
}
```

### API Endpoints

- `POST /services/teams`
  - Body: `{tournamentId: 1, color: "Blue", player1Id: 1, ...}`

## Test Flow: Create Game (Admin Only)

### Prerequisites

- User must be logged in as admin
- At least 2 teams must exist in the tournament

### Entry Point

- **URL**: `http://localhost:5001/tournaments/{tournamentId}`
- **Action**: Use "Create Game" form in games section

### Test Steps

1. **Access Create Game Form**

   - As admin, navigate to tournament details
   - Locate create game form (may be above or below game grid)
   - Form should contain:
     - Round selector (dropdown)
     - Court selector (dropdown)
     - Home team selector (dropdown)
     - Away team selector (dropdown)
     - Video URL input (optional)
     - "Create Game" submit button

2. **Select Round**

   - Open round selector
   - Verify only available rounds shown
   - Available = rounds with open court slots
   - Rounds options:
     - Round 1, Round 2, Round 3, Round 4, Round 5
     - Elimination, Quarter Finals, Semi Finals, Championship
   - Select: "Round 1"
   - Verify first available round is pre-selected

3. **Select Court**

   - Open court selector
   - Verify available courts for selected round
   - Court options: 1, 2, 3, 4
   - If a court already has a game in selected round, it should not appear
   - Select: "Court 1"
   - Verify first available court is pre-selected

4. **Test Round/Court Availability Logic**

   - Select a round
   - Verify court selector updates to show only available courts
   - Change round selection
   - Verify court selector updates dynamically
   - If all courts full for a round, round should be removed from selector

5. **Select Home Team**

   - Open home team selector
   - Verify available teams for this round
   - Teams already assigned to games in this round should not appear
   - Select: "Blue Team"

6. **Select Away Team**

   - Open away team selector
   - Verify home team is NOT in list
   - Verify other used teams in this round are not in list
   - Select: "Red Team"

7. **Test Team Availability Logic**

   - Verify same team cannot be both home and away
   - Verify teams can only play once per round
   - Verify team selectors update dynamically based on selections

8. **Enter Video URL (Optional)**

   - Enter full YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Or enter short URL: `https://youtu.be/dQw4w9WgXcQ`
   - Or enter just video ID: `dQw4w9WgXcQ`
   - Verify all formats are accepted

9. **Test Video URL Extraction**

   - Enter full YouTube URL
   - Upon save, verify only video ID is stored
   - Regex pattern: `/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/`
   - Example: Input `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s`
   - Stored: `dQw4w9WgXcQ`

10. **Test Successful Game Creation**

    - Select all required fields:
      - Round: "Round 1"
      - Court: "1"
      - Home Team: "Blue Team"
      - Away Team: "Red Team"
      - Video URL: (optional)
    - Click "Create Game"
    - Expected outcomes:
      - Game is saved to database
      - Game appears in grid at Round 1, Court 1
      - Form is cleared
      - Round/Court availability updates
      - Selected teams no longer available in that round

11. **Verify Game in Grid**

    - After creation, locate game in grid
    - Verify position: correct row (round) and column (court)
    - Verify home and away team colors/names displayed
    - Verify game is clickable link

12. **Test Maximum Games Per Round**
    - Create games in a round until all 4 courts full
    - Verify round no longer appears in selector
    - Or verify appropriate message displayed

### Expected Data Structure

```json
{
  "id": 1,
  "tournamentId": 1,
  "round": "Round 1",
  "court": "1",
  "homeTeamId": 1,
  "awayTeamId": 2,
  "videoUrl": "dQw4w9WgXcQ"
}
```

### API Endpoints

- `GET /services/games?where[tournamentId]={id}` - Get all games for tournament
- `POST /services/games`
  - Body: `{tournamentId, round, court, homeTeamId, awayTeamId, videoUrl}`

## Test Flow: Delete Team (Admin Only)

### Prerequisites

- User must be logged in as admin
- Team must exist

### Test Steps

1. **Initiate Team Deletion**

   - As admin, locate delete button next to a team
   - Click delete button
   - Verify confirmation dialog

2. **Test Delete Confirmation**

   - Message: "Are you sure you want to delete this team?"
   - Test "Cancel" → Team NOT deleted
   - Test "OK" → Team deleted

3. **Test Delete with Associated Games**
   - Try to delete team that has games
   - Verify handling:
     - Option A: Deletion prevented
     - Option B: Games also deleted (cascade)
     - Document actual behavior

## Test Flow: Delete Game (Admin Only)

### Prerequisites

- User must be logged in as admin
- Game must exist

### Test Steps

1. **Initiate Game Deletion**

   - As admin, locate delete button on game
   - Click delete button
   - Verify confirmation dialog

2. **Test Delete Confirmation**

   - Message: "Are you sure you want to delete this game?"
   - Test "Cancel" → Game NOT deleted
   - Test "OK" → Game deleted

3. **Test Delete with Statistics**

   - Delete game that has statistics
   - Verify stats are handled:
     - Option A: Deletion prevented
     - Option B: Stats also deleted (cascade)
     - Document actual behavior

4. **Verify Grid Updates**
   - After deletion, verify game removed from grid
   - Verify round/court slot now available
   - Verify teams available for that round again

## Data Relationships

### Tournament Data Structure

```json
{
  "id": 1,
  "name": "Summer League 2023",
  "date": "2023-09-04T00:00:00.000Z",
  "teams": [
    {
      "id": 1,
      "color": "Blue",
      "player1Id": 1,
      "player1": { "id": 1, "name": "Player A" },
      "player2": {...},
      "player3": {...},
      "player4": {...}
    }
  ],
  "games": [
    {
      "id": 1,
      "round": "Round 1",
      "court": "1",
      "homeTeamId": 1,
      "homeTeam": {...},
      "awayTeamId": 2,
      "awayTeam": {...},
      "videoUrl": "...",
      "stats": [...]
    }
  ]
}
```

## API Endpoints Tested

- `GET /services/tournaments` - List all tournaments (ordered by date)
- `GET /services/tournaments/{id}` - Get tournament details
- `POST /services/tournaments` - Create tournament (admin)
- `DELETE /services/tournaments/{id}` - Delete tournament (admin)
- `GET /services/teams?where[tournamentId]={id}` - Get teams for tournament
- `POST /services/teams` - Create team (admin)
- `DELETE /services/teams/{id}` - Delete team (admin)
- `GET /services/games?where[tournamentId]={id}` - Get games for tournament
- `POST /services/games` - Create game (admin)
- `DELETE /services/games/{id}` - Delete game (admin)
- `GET /services/stats` - Get all stats (filtered client-side by gameId)
- `GET /services/players?orderBy=name` - Get all players for team creation

## Edge Cases to Test

1. **Tournament with No Teams**

   - View tournament details
   - Verify empty teams message
   - Verify admin can create teams

2. **Tournament with Teams but No Games**

   - View tournament details
   - Verify empty game grid
   - Verify teams display correctly

3. **Tournament with Many Games (Full Grid)**

   - Create games for all rounds and courts
   - Verify grid displays correctly
   - Verify create form indicates no more slots

4. **Same Teams Play Multiple Times**

   - Blue vs Red in Round 1
   - Blue vs Red in Round 2
   - Verify both games display correctly
   - Verify teams can replay in different rounds

5. **Player on Multiple Teams**

   - Try to assign same player to two different teams
   - Expected: Second assignment should be prevented
   - Player selector should not show already-assigned players

6. **Team with Missing Players**

   - If somehow team has null player IDs
   - Verify display handles gracefully
   - Show "No player" or hide slot

7. **Game with Invalid Teams**

   - If team IDs are invalid (deleted teams)
   - Verify error handling
   - Verify page doesn't crash

8. **Very Long Tournament Name**

   - Create tournament: "The Most Amazing Basketball Tournament Ever Created in History"
   - Verify UI doesn't break
   - Verify truncation if needed

9. **Future Tournament Date**

   - Create tournament with date far in future
   - Verify date displays correctly
   - Verify sorting works

10. **Past Tournament Date (Historical)**
    - Create tournament with old date (e.g., 1990)
    - Verify historical data handled correctly

## Permissions Testing

### Non-Admin User

- ✅ Can view tournament list
- ✅ Can view tournament details
- ✅ Can see all teams and games
- ✅ Can click through to games and players
- ✅ Can view aggregated statistics
- ❌ Cannot see create tournament form
- ❌ Cannot see delete buttons
- ❌ Cannot create teams or games
- ❌ Cannot delete any data

### Admin User

- ✅ All non-admin capabilities
- ✅ Can create tournaments
- ✅ Can delete tournaments
- ✅ Can create teams
- ✅ Can delete teams
- ✅ Can create games
- ✅ Can delete games
- ✅ All CRUD operations persist correctly

## Success Criteria

✅ Tournament list displays all tournaments ordered by date  
✅ Admin users can create tournaments with name and date  
✅ Tournament creation requires date (validated)  
✅ Admin users can delete tournaments with confirmation  
✅ Tournament details show games organized by round/court  
✅ Tournament details show all teams with players  
✅ Admin users can create teams with color and 4 players  
✅ Player availability enforced (no duplicates, no reuse)  
✅ Color availability enforced (unique per tournament)  
✅ Admin users can create games with round/court/teams  
✅ Round/court availability dynamically calculated  
✅ Team availability per round enforced  
✅ Video URL extracts YouTube ID correctly  
✅ Games appear in correct grid position  
✅ Player statistics aggregated across all tournament games  
✅ Statistics calculations are accurate (TP, FG%, etc.)  
✅ Admin users can delete teams and games  
✅ Non-admin users cannot access admin features  
✅ Page handles empty states gracefully  
✅ Navigation between related entities works correctly
