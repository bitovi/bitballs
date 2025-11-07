# Navigation and Application Flow - E2E Test Documentation

## Overview

This document covers the overall navigation structure, routing behavior, and cross-functional flows within the Bitballs application. It ensures that the application's navigation is intuitive, consistent, and properly handles all edge cases.

## Application Structure

### Routes

The application uses pushstate routing with the following structure:

| Route               | Component            | Description                     | Parameters     |
| ------------------- | -------------------- | ------------------------------- | -------------- |
| `/`                 | `tournament-list`    | Default page (tournaments list) | -              |
| `/tournaments`      | `tournament-list`    | Same as home page               | -              |
| `/tournaments/{id}` | `tournament-details` | Tournament detail view          | `tournamentId` |
| `/games/{id}`       | `game-details`       | Game detail view with video     | `gameId`       |
| `/players`          | `player-list`        | List of all players             | -              |
| `/players/{id}`     | `player-details`     | Player detail view with stats   | `playerId`     |
| `/users`            | `user-list`          | List of users (admin only)      | -              |
| `/register`         | `user-details`       | User registration form          | -              |
| `/account`          | `user-details`       | User account settings           | -              |
| `/*`                | `four-0-four`        | 404 error page                  | -              |

## Test Flow: Primary Navigation

### Navigation Bar Elements

1. **Bitballs Logo/Title**

   - Located in top-left
   - Clicking should navigate to home/tournaments page
   - Always visible on all pages

2. **Main Navigation Links**

   - **Tournaments**: Navigate to `/tournaments`
   - **Players**: Navigate to `/players`
   - **Users**: Navigate to `/users` (admin only - hide for non-admin)

3. **Session Dropdown** (Right side)
   - When logged out: Shows login form
   - When logged in: Shows user email and logout option
   - Clicking opens/closes dropdown menu

### Test Steps

1. **Test All Navigation Links**

   - Start at home page
   - Click "Tournaments" → Verify URL is `/tournaments`
   - Click "Players" → Verify URL is `/players`
   - If admin, click "Users" → Verify URL is `/users`
   - Each click should load appropriate page

2. **Test Logo/Title Navigation**

   - Navigate to any page (e.g., player details)
   - Click logo/title in top-left
   - Verify navigation to home/tournaments page

3. **Test Active State Indicators**

   - Navigate to each page
   - Verify current page has active/highlighted state in nav
   - CSS class should indicate current location

4. **Test Navigation Persistence**
   - Login as user
   - Navigate to different pages
   - Verify navigation bar persists on all pages
   - Verify session state persists across navigation

## Test Flow: Breadcrumb Navigation

### Hierarchical Navigation Paths

1. **Tournament → Game → Back**

   - Start at tournament details
   - Click on a game
   - Use browser back button
   - Verify return to tournament details
   - Verify tournament data is still loaded

2. **Tournament → Player → Back**

   - Start at tournament details
   - Click on a player from a team
   - Use browser back button
   - Verify return to tournament details

3. **Player List → Player Details → Back**

   - Start at player list
   - Click on a player
   - Use browser back button
   - Verify return to player list

4. **Deep Link Entry**
   - Directly navigate to deep URL: `/games/5`
   - Verify game loads correctly
   - Click back button
   - Verify appropriate fallback (may go to browser history or home)

## Test Flow: Cross-Entity Navigation

### From Tournament Details

**Available Links:**

- ✅ Individual games (click game cell)
- ✅ Players on teams (click player name)
- ✅ Back to tournament list (breadcrumb or back button)

**Test Steps:**

1. Navigate to tournament details
2. Click on a game → Verify navigation to game details
3. Return to tournament (back button)
4. Click on a player → Verify navigation to player details
5. Return to tournament (back button)
6. Verify tournament data is still intact

### From Game Details

**Available Links:**

- ✅ Tournament name (link back to tournament)
- ✅ Home team players (4 links)
- ✅ Away team players (4 links)
- ✅ Individual stats may link to players

**Test Steps:**

1. Navigate to game details
2. Click tournament name → Verify navigation to tournament details
3. Return to game (back button)
4. Click on home team player → Verify navigation to player details
5. Return to game (back button)
6. Click on away team player → Verify navigation to player details
7. Verify video state resets on return (expected behavior)

### From Player Details

**Available Links:**

- ✅ Games played (links to game details)
- ✅ Tournaments participated in

**Test Steps:**

1. Navigate to player details
2. Review list of games player participated in
3. Click on a game → Verify navigation to game details
4. Return to player (back button)
5. Verify player stats still displayed

## Test Flow: URL Handling

### Valid URLs

1. **Test Direct URL Access**

   - In browser, enter: `http://localhost:5001/tournaments/1`
   - Verify page loads correctly
   - Repeat for all valid route patterns

2. **Test URL Parameters**

   - Navigate: `/tournaments/999` (non-existent ID)
   - Expected: 404 page or error message
   - Navigate: `/tournaments/abc` (invalid ID format)
   - Expected: 404 page or error handling

3. **Test Trailing Slashes**
   - Navigate: `/tournaments/` (with slash)
   - Verify loads correctly
   - Navigate: `/tournaments` (without slash)
   - Verify loads correctly
   - Both should be equivalent

### Invalid URLs

1. **Test 404 Handling**

   - Navigate to: `/nonexistent-page`
   - Verify 404 component renders
   - Verify appropriate error message
   - Verify navigation bar still present
   - Verify can navigate away from 404

2. **Test Malformed URLs**
   - Navigate to: `/tournaments//1` (double slash)
   - Navigate to: `/tournaments/1/extra` (extra segment)
   - Verify appropriate handling (404 or redirect)

## Test Flow: Browser History

### Forward/Back Navigation

1. **Test History Stack**

   - Navigate: Home → Players → Player 1 → Back → Back
   - Verify each back button click goes to previous page
   - Verify forward button works correctly

2. **Test History After Form Submission**

   - As admin, create a tournament
   - After creation, click back button
   - Verify: Does it return to form or previous page?
   - Document expected behavior

3. **Test History with Query Parameters**
   - If any pages use query params (e.g., filters)
   - Verify back/forward preserves query state

### Refresh Behavior

1. **Test Page Refresh**

   - Navigate to any page
   - Press F5 or Cmd+R to refresh
   - Verify page reloads correctly
   - Verify data is re-fetched from server
   - Verify session is maintained

2. **Test Refresh on Dynamic Pages**
   - Navigate to game details with video playing
   - Refresh page
   - Verify video reloads
   - Verify stats reload correctly

## Test Flow: Page Titles

### Title Updates

1. **Test Title on Each Page**

   - Home/Tournaments: "BitBalls | Tournaments"
   - Player List: "BitBalls | Players"
   - Player Details: "BitBalls | Player"
   - Tournament Details: "BitBalls | Tournament"
   - Game Details: "BitBalls | Game"
   - User Registration: "BitBalls | Account"
   - 404 Page: "BitBalls | Page Not Found"

2. **Verify Browser Tab Title**
   - Open each page
   - Check browser tab shows correct title
   - Verify title updates when navigating
   - Useful for identifying tabs when multiple are open

## Test Flow: Loading States

### Data Loading

1. **Test Loading Indicators**

   - Navigate to a page (e.g., tournament details)
   - Observe loading state before data appears
   - Should see:
     - Spinner/loader
     - Or skeleton UI
     - Or "Loading..." text
   - Verify page doesn't flash or show errors during load

2. **Test Slow Network**

   - Use browser dev tools to throttle network
   - Navigate between pages
   - Verify loading states display appropriately
   - Verify no errors if data takes time to load

3. **Test Failed Data Load**
   - Simulate network error (disable network in dev tools)
   - Navigate to a page
   - Verify error message displays
   - Verify user can retry or navigate away

## Test Flow: Responsive Navigation

### Mobile/Tablet Views

1. **Test Mobile Menu**

   - Resize browser to mobile width (<768px)
   - Verify navigation collapses to hamburger menu (if implemented)
   - Or verify navigation adapts to mobile layout

2. **Test Touch Interactions**

   - On touch device or emulator
   - Verify all links are tappable
   - Verify dropdowns work with touch
   - Verify no hover-only interactions

3. **Test Tablet View**
   - Resize to tablet width (768px - 1024px)
   - Verify layout is appropriate
   - Verify navigation is usable

## Test Flow: Keyboard Navigation

### Accessibility

1. **Test Tab Order**

   - Use Tab key to navigate through page
   - Verify logical tab order:
     - Logo/title
     - Main nav links
     - Session dropdown
     - Page content links
   - Verify focus indicators are visible

2. **Test Enter Key**

   - Tab to a navigation link
   - Press Enter
   - Verify navigation occurs

3. **Test Dropdown with Keyboard**

   - Tab to Session dropdown
   - Press Enter or Space to open
   - Use arrow keys to navigate items (if implemented)
   - Press Enter to select

4. **Test Escape Key**
   - Open session dropdown
   - Press Escape key
   - Verify dropdown closes

## Test Flow: Session-Based Navigation

### User State Changes

1. **Test Navigation After Login**

   - Start logged out
   - Login successfully
   - Verify navigation updates:
     - Session dropdown shows email
     - Admin-only links appear (if admin)
     - Stay on current page or redirect appropriately

2. **Test Navigation After Logout**

   - Start logged in
   - Logout
   - Verify navigation updates:
     - Session dropdown shows login form
     - Admin-only links disappear
     - Remain on current page (if allowed)
     - Or redirect to home if unauthorized

3. **Test Protected Routes**
   - Logout
   - Directly navigate to: `/users` (admin-only)
   - Expected behavior:
     - Redirect to login
     - Show error message
     - Or show page but without admin features
   - Document actual behavior

## Test Flow: Search and Filters (If Implemented)

### Search Functionality

1. **Global Search**

   - If global search exists in nav
   - Test searching for:
     - Player names
     - Tournament names
     - Team names
   - Verify results are relevant
   - Verify clicking result navigates correctly

2. **Page-Specific Filters**
   - On player list, test filtering/sorting
   - On tournament list, test date filters
   - Verify URL updates with filter params (if implemented)
   - Verify back button restores previous filter state

## Error Handling

### Network Errors

1. **Test API Failure**

   - Disable network connection
   - Navigate to a page
   - Verify error message: "Unable to load data" or similar
   - Verify retry mechanism (if implemented)

2. **Test Timeout**
   - Simulate slow server
   - Verify timeout handling
   - Verify error message is user-friendly

### Invalid Data

1. **Test Missing Data**

   - Navigate to entity with deleted/missing data
   - Example: `/players/999999`
   - Verify appropriate error handling
   - Verify can navigate away

2. **Test Corrupted Data**
   - If server returns invalid JSON
   - Verify application doesn't crash
   - Verify error is logged/reported

## Performance Testing

### Navigation Speed

1. **Test Navigation Latency**

   - Click between pages rapidly
   - Verify smooth transitions
   - Verify no duplicate requests
   - Verify previous page cleans up properly

2. **Test Large Data Sets**
   - Tournament with 100+ games
   - Player list with 500+ players
   - Verify navigation remains responsive
   - Verify no memory leaks

### Caching

1. **Test Data Caching**

   - Visit tournament details
   - Navigate away
   - Return to same tournament
   - Check if data is cached (faster load)
   - Or verify data is re-fetched (always fresh)

2. **Test Image Caching**
   - If player photos exist
   - Verify images cache properly
   - Verify don't re-download on return visit

## Cross-Browser Testing

### Browser Compatibility

1. **Test in Chrome**

   - All navigation flows
   - Verify everything works

2. **Test in Firefox**

   - All navigation flows
   - Verify everything works

3. **Test in Safari**

   - All navigation flows
   - Verify pushstate routing works
   - Verify back/forward buttons work

4. **Test in Edge**
   - All navigation flows
   - Verify compatibility

## Success Criteria

✅ All navigation links work correctly  
✅ Active page is visually indicated in navigation  
✅ Browser back/forward buttons work correctly  
✅ Page titles update appropriately  
✅ Direct URL access works for all routes  
✅ Invalid URLs show 404 page  
✅ Session state persists across navigation  
✅ Admin-only navigation hidden for non-admin users  
✅ Loading states display during data fetch  
✅ Error states display when data fails to load  
✅ Keyboard navigation works correctly  
✅ Mobile navigation is usable  
✅ Page refresh maintains current page state  
✅ Cross-entity navigation works (tournament → game → player)  
✅ No console errors during navigation  
✅ Navigation is performant with large data sets  
✅ All interactive elements have focus indicators  
✅ Dropdown menus work correctly  
✅ Logo/title returns to home page  
✅ Navigation bar persists on all pages

## Additional Notes

### Expected Behaviors to Document

1. **Video State on Navigation**

   - When navigating away from game page with playing video
   - Does video stop? (Expected: Yes)
   - When returning via back button, does video restart? (Expected: Yes, from beginning)

2. **Form State on Navigation**

   - If filling out a form (e.g., create team)
   - Navigate away without submitting
   - Return via back button
   - Is form data preserved? (May vary by implementation)

3. **Scroll Position**

   - Scroll down on long page
   - Navigate to different page
   - Return via back button
   - Does scroll position restore? (Browser default behavior)

4. **Real-time Updates**
   - If on a page (e.g., tournament details)
   - Another admin creates a game in different session
   - Does current page update automatically?
   - Or need to refresh? (Document actual behavior)
