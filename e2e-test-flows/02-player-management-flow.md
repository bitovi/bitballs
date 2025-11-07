# Player Management Flow - E2E Test Documentation

## Overview

The Bitballs application provides comprehensive player management functionality including listing all players, viewing detailed player statistics, and creating/editing/deleting player records (admin only).

## Test Flow: Player List View

### Entry Point

- **URL**: `http://localhost:5001/players`
- **Navigation**: Click "Players" link in top navigation bar

### Test Steps

1. **Navigate to Players Page**

   - Click "Players" in the navigation menu
   - Verify URL changes to `/players`
   - Verify page title shows "BitBalls | Players"

2. **View Player List (Non-Admin User)**

   - Verify list of players is displayed
   - Each player entry should show:
     - Player name (clickable link)
     - Player image/avatar (if available)
   - Verify players are ordered alphabetically by name
   - Verify NO edit/delete buttons are visible for non-admin users

3. **View Player List (Admin User)**

   - Login as admin user
   - Navigate to `/players`
   - Verify all player entries have:
     - Edit button/icon
     - Delete button/icon
   - Verify "Create New Player" button or form is visible

4. **Test Empty State**
   - If no players exist (fresh database):
     - Verify appropriate empty state message
     - Verify no errors are displayed
     - Admin should still see "Create New Player" option

### Expected Elements

- **Player List Container**: Table or card grid displaying all players
- **Player Entry Structure**:
  ```html
  <player-list>
    <div class="player-item">
      <a href="/players/{playerId}">Player Name</a>
      <!-- Admin only -->
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  </player-list>
  ```

## Test Flow: View Player Details

### Entry Point

- **URL**: `http://localhost:5001/players/{playerId}`
- **Navigation**: Click on a player name from the player list

### Test Steps

1. **Navigate to Player Details**

   - From player list, click on any player name
   - Verify URL changes to `/players/{playerId}`
   - Verify page title shows "BitBalls | Player"

2. **View Player Information**

   - Verify player details are displayed:
     - Player name (heading)
     - Weight (in lbs)
     - Height (in inches or ft/in)
     - Birthday (formatted date)
     - Profile information (if available)
     - Starting rank (if available)

3. **View Player Statistics**

   - Verify statistics section is present
   - Statistics should be organized by tournament
   - Each tournament section should display:
     - Tournament name
     - Tournament year
     - Games played in that tournament
   - Each stat entry should show:
     - Game information
     - Stat types (points, rebounds, assists, etc.)
     - Stat values
     - Time played

4. **View Games Played**

   - Verify list of games the player participated in
   - Each game should be clickable link to game details
   - Verify game information includes:
     - Tournament name
     - Date played
     - Teams involved

5. **Test with Player Who Has No Stats**

   - Navigate to a player with no game statistics
   - Verify appropriate "No statistics available" message
   - Verify no errors are thrown

6. **Test with Invalid Player ID**
   - Navigate to `/players/99999` (non-existent ID)
   - Verify 404 error page or appropriate error message
   - Verify no application crash

### Expected Data Display

- **Player Card**:

  ```
  Player Name: John Doe
  Height: 6'2" (74 inches)
  Weight: 180 lbs
  Birthday: January 1, 1990
  Starting Rank: 5
  ```

- **Tournament Statistics**:
  ```
  Tournament: Summer League 2023
  ├─ Game 1 vs Team B
  │  ├─ Points: 15
  │  ├─ Rebounds: 8
  │  ├─ Assists: 3
  │  └─ Time: 25:30
  └─ Game 2 vs Team C
     ├─ Points: 20
     └─ ...
  ```

## Test Flow: Create New Player (Admin Only)

### Prerequisites

- User must be logged in as admin

### Entry Point

- **URL**: `http://localhost:5001/players`
- **Action**: Click "Create New Player" button or access inline form

### Test Steps

1. **Access Create Player Form**

   - As admin, navigate to Players page
   - Verify create player form is visible
   - Form should contain fields for:
     - Name (text input, required)
     - Weight (number input, in lbs)
     - Height (number input, in inches)
     - Birthday (date input)
     - Profile (textarea, optional)
     - Starting Rank (number input, optional)

2. **Test Form Validation - Empty Name**

   - Leave name field empty
   - Fill other fields with valid data
   - Click "Save" or "Create" button
   - Expected: Validation error "Cannot create a player without a name"
   - Verify player is NOT created

3. **Test Form Validation - Invalid Data Types**

   - Enter text in weight field: "abc"
   - Enter text in height field: "xyz"
   - Expected: Browser validation prevents submission
   - Or server returns validation error

4. **Test Successful Player Creation**

   - Enter valid data:
     - Name: "Michael Jordan"
     - Weight: 216
     - Height: 78
     - Birthday: "02/17/1963"
     - Profile: "Hall of Fame player"
     - Starting Rank: 1
   - Click "Save" or "Create" button
   - Expected outcomes:
     - Success message is displayed
     - New player appears in the player list
     - Form is cleared (ready for another entry)
     - Or redirected to the new player's detail page

5. **Test Minimum Required Fields**
   - Enter only the name: "New Player"
   - Leave all other fields empty
   - Click "Save" button
   - Expected: Player is created successfully with only name populated

### Expected Form Structure

```html
<player-edit>
  <form>
    <input type="text" name="name" required placeholder="Player Name" />
    <input type="number" name="weight" placeholder="Weight (lbs)" />
    <input type="number" name="height" placeholder="Height (inches)" />
    <input type="date" name="birthday" placeholder="Birthday" />
    <textarea name="profile" placeholder="Profile"></textarea>
    <input type="number" name="startRank" placeholder="Starting Rank" />
    <button type="submit">Save Player</button>
    <button type="button" class="cancel">Cancel</button>
  </form>
</player-edit>
```

## Test Flow: Edit Existing Player (Admin Only)

### Prerequisites

- User must be logged in as admin
- At least one player must exist

### Entry Point

- **URL**: `http://localhost:5001/players`
- **Action**: Click "Edit" button next to a player

### Test Steps

1. **Access Edit Player Form**

   - Navigate to Players page as admin
   - Click "Edit" button/icon next to a player
   - Verify edit form appears (inline or modal/overlay)
   - Verify form is pre-populated with player's current data

2. **Test Form Pre-population**

   - Verify all fields show current player values:
     - Name field shows player name
     - Weight shows current weight
     - Height shows current height
     - Birthday shows formatted date
     - Profile shows current profile text
     - Starting Rank shows current rank

3. **Test Edit and Save**

   - Modify player name: "Updated Player Name"
   - Modify weight: 210
   - Click "Save" button
   - Expected outcomes:
     - Success message displayed
     - Edit form closes
     - Player list updates with new values
     - Database is updated (verify by refreshing page)

4. **Test Edit and Cancel**

   - Click "Edit" on a player
   - Modify some fields
   - Click "Cancel" button
   - Expected outcomes:
     - Edit form closes
     - Changes are NOT saved
     - Player data remains unchanged
     - Form disappears or resets

5. **Test Edit Validation**

   - Click "Edit" on a player
   - Clear the name field (leave empty)
   - Click "Save"
   - Expected: Validation error prevents save
   - Verify original data is preserved

6. **Test Concurrent Edits**
   - Click "Edit" on Player A
   - Without saving, check that:
     - Only one player can be edited at a time
     - Or multiple edit forms can be open simultaneously
   - Verify behavior is consistent and data integrity maintained

### Edit Form Behavior

- **Backup and Restore**: Changes should be backed up before editing
- **Cancel Restores Original**: Cancel button restores pre-edit state
- **Save Commits Changes**: Save button persists changes to database

## Test Flow: Delete Player (Admin Only)

### Prerequisites

- User must be logged in as admin
- At least one player must exist

### Entry Point

- **URL**: `http://localhost:5001/players`
- **Action**: Click "Delete" button next to a player

### Test Steps

1. **Initiate Player Deletion**

   - Navigate to Players page as admin
   - Click "Delete" button/icon next to a player
   - Verify confirmation dialog appears

2. **Test Delete Confirmation Dialog**

   - Verify dialog message: "Are you sure you want to delete this player?"
   - Verify "OK" or "Confirm" button is present
   - Verify "Cancel" button is present

3. **Test Delete Cancellation**

   - Click "Delete" button
   - In confirmation dialog, click "Cancel"
   - Expected outcomes:
     - Dialog closes
     - Player is NOT deleted
     - Player remains in the list

4. **Test Successful Deletion**

   - Click "Delete" button next to a player
   - In confirmation dialog, click "OK" or "Confirm"
   - Expected outcomes:
     - Player is removed from the list immediately
     - Success message may appear
     - Database record is deleted
     - Refresh page to verify deletion persisted

5. **Test Delete Player with Associated Data**

   - Delete a player who has game statistics
   - Verify appropriate handling:
     - Option A: Deletion is prevented with warning message
     - Option B: Associated stats are also deleted (cascading delete)
     - Option C: Stats are orphaned but remain in database
   - Document the actual behavior observed

6. **Test Delete Last Player**
   - If only one player remains, delete it
   - Verify empty state is displayed correctly
   - Verify no errors occur

### Expected Behavior

- **Confirmation Required**: User must confirm before deletion
- **Immediate Feedback**: List updates immediately upon deletion
- **Data Integrity**: Associated data is handled appropriately

## Test Flow: Player Search/Filter (If Implemented)

### Test Steps

1. **Search by Name**

   - If search box is present on players page
   - Enter partial player name
   - Verify list filters to matching players only

2. **Sort Options**

   - If sorting is available
   - Test sort by:
     - Name (A-Z, Z-A)
     - Height
     - Weight
     - Starting Rank

3. **Filter by Criteria**
   - Test any available filters
   - Verify correct players are displayed

## API Endpoints Tested

- `GET /services/players` - List all players (ordered by name)
- `GET /services/players/{id}` - Get specific player details
- `POST /services/players` - Create new player (admin only)
- `PUT /services/players/{id}` - Update existing player (admin only)
- `DELETE /services/players/{id}` - Delete player (admin only)

## Related Data

### Statistics Integration

- Players are linked to statistics via `playerId`
- Statistics are retrieved with query: `GET /services/stats?where[playerId]={id}`
- Stats include related game and tournament data via `withRelated` parameter

### Games Integration

- Players participate in games through statistics records
- Game list shows games where player has stats

## Permissions Testing

### Non-Admin User

- ✅ Can view player list
- ✅ Can view player details
- ✅ Can click through to games and tournaments
- ❌ Cannot see edit buttons
- ❌ Cannot see delete buttons
- ❌ Cannot see create player form
- ❌ Cannot access edit/delete endpoints (should return 403)

### Admin User

- ✅ Can view player list
- ✅ Can view player details
- ✅ Can create new players
- ✅ Can edit existing players
- ✅ Can delete players
- ✅ All CRUD operations persist correctly

## Edge Cases to Test

1. **Player with Maximum Stats**

   - Test player who played in many tournaments
   - Verify page performance remains acceptable
   - Verify statistics display correctly

2. **Player with Special Characters in Name**

   - Create player: "O'Neill" or "José García"
   - Verify name displays correctly
   - Verify URL encoding works properly

3. **Player with Null/Empty Fields**

   - Player with no height, weight, birthday
   - Verify display handles null values gracefully
   - No "undefined" or "null" text shown

4. **Very Long Player Names**

   - Test with name: "Christopher Alexander Montgomery III"
   - Verify UI doesn't break
   - Verify text truncation if needed

5. **Negative or Zero Values**

   - Test weight: 0 or -5
   - Test height: 0 or -10
   - Verify validation prevents or handles appropriately

6. **Future Birthday Dates**
   - Enter birthday in the future
   - Verify validation prevents or calculates negative age

## Performance Testing

1. **Large Player List**

   - With 100+ players in database
   - Measure page load time
   - Verify scrolling is smooth
   - Test if pagination is implemented

2. **Player with Many Stats**
   - Player with 50+ game statistics
   - Verify details page loads in reasonable time
   - Check if lazy loading is implemented

## Accessibility Testing

1. **Keyboard Navigation**

   - Tab through player list
   - Press Enter to navigate to player details
   - Navigate form fields with Tab
   - Submit forms with Enter

2. **Screen Reader Compatibility**

   - Verify proper ARIA labels
   - Verify headings are semantic
   - Verify form labels are associated with inputs

3. **Visual Accessibility**
   - Verify sufficient color contrast
   - Test with browser zoom (200%)
   - Verify responsive design on mobile

## Success Criteria

✅ Player list displays all players ordered by name  
✅ Player details show complete information and statistics  
✅ Admin users can create new players with valid data  
✅ Admin users cannot create players without a name  
✅ Admin users can edit existing player information  
✅ Edit cancel button restores original values  
✅ Admin users can delete players with confirmation  
✅ Delete cancel button prevents deletion  
✅ Non-admin users cannot see edit/delete controls  
✅ Non-admin users cannot access admin endpoints  
✅ Player statistics are displayed grouped by tournament  
✅ Games list shows all games player participated in  
✅ Form validation prevents invalid data entry  
✅ Navigation between players and related data works correctly  
✅ Page handles edge cases gracefully (no data, invalid IDs, etc.)
