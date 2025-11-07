# Bitballs E2E Test Flows - Overview and Summary

## Introduction

This directory contains comprehensive end-to-end test documentation for the Bitballs basketball tournament management application. These documents serve as a guide for QA testing, automated test development, and understanding the complete user journey through the application.

## 🚀 Quick Start

This directory is configured as a **standalone Playwright test environment**. To run automated tests:

1. **Setup**: See [README-SETUP.md](./README-SETUP.md) for installation and configuration
2. **Install dependencies**: `npm install` (in this directory)
3. **Run tests**: `npm test` (ensure app is running on port 5001)

For detailed setup instructions, test execution, and CI/CD integration, see **[README-SETUP.md](./README-SETUP.md)**.

## Application Overview

**Bitballs** is a basketball tournament coordination app built with DoneJS. It enables users to:

- Organize tournaments with multiple teams and games
- Track game statistics synchronized with YouTube video playback
- Manage player profiles and aggregate tournament statistics
- View real-time game scores and player performance metrics

### Technology Stack

- **Frontend**: DoneJS (CanJS, StealJS)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Video**: YouTube IFrame API
- **Authentication**: Passport.js with local strategy

## Test Flow Documents

### 1. [Authentication Flow](./01-authentication-flow.md)

**Coverage**: User registration, login, logout, session management

**Key Features Tested:**

- ✅ User registration with email/password validation
- ✅ Login with credentials
- ✅ Logout functionality
- ✅ Session persistence across page navigation
- ✅ Admin vs. regular user permissions
- ✅ Password security and validation

**User Personas:**

- Anonymous/Guest User
- Registered User
- Admin User

### 2. [Player Management Flow](./02-player-management-flow.md)

**Coverage**: Player list, details, create, edit, delete operations

**Key Features Tested:**

- ✅ View all players (ordered by name)
- ✅ View individual player details and statistics
- ✅ Create new players (admin only)
- ✅ Edit existing player information (admin only)
- ✅ Delete players with confirmation (admin only)
- ✅ View player statistics aggregated by tournament
- ✅ View games player participated in

**CRUD Operations:**

- **C**reate: Admin can add new players with name, height, weight, etc.
- **R**ead: All users can view player list and details
- **U**pdate: Admin can edit player information
- **D**elete: Admin can delete players (with confirmation)

### 3. [Game Details Flow](./03-game-details-flow.md)

**Coverage**: Game viewing, video playback, statistics tracking

**Key Features Tested:**

- ✅ YouTube video embedding and playback
- ✅ Real-time score updates synced with video time
- ✅ Visual stat timeline showing events
- ✅ Clicking stats to seek video
- ✅ Create stats synced to video time (admin only)
- ✅ Delete stats with score recalculation (admin only)
- ✅ Time adjustment controls before saving stats
- ✅ Player and team information display

**Complex Interactions:**

- Video time cursor tracking across player timelines
- Current score calculation based on video position
- Final score calculation from all stats
- Admin stat creation workflow with video pause

### 4. [Tournament Management Flow](./04-tournament-management-flow.md)

**Coverage**: Tournament organization, teams, games, scheduling

**Key Features Tested:**

- ✅ List all tournaments (ordered by date)
- ✅ Create tournaments (admin only)
- ✅ Delete tournaments (admin only)
- ✅ View tournament details with game grid
- ✅ Create teams with color and 4 players (admin only)
- ✅ Create games with round/court/teams (admin only)
- ✅ View aggregated player statistics per tournament
- ✅ Game grid organized by rounds and courts

**Business Logic:**

- Round/court availability (max 4 courts per round)
- Team availability per round (team can't play twice in same round)
- Player availability (player can't be on multiple teams)
- Color uniqueness per tournament
- YouTube URL extraction and validation

### 5. [Navigation and Routing Flow](./05-navigation-and-routing-flow.md)

**Coverage**: Application navigation, routing, browser behavior

**Key Features Tested:**

- ✅ Primary navigation links (Tournaments, Players, Users)
- ✅ Cross-entity navigation (Tournament → Game → Player)
- ✅ Browser back/forward button handling
- ✅ Direct URL access to deep links
- ✅ 404 error handling for invalid routes
- ✅ Page title updates
- ✅ Loading and error states
- ✅ Responsive navigation for mobile
- ✅ Keyboard navigation and accessibility

**Route Structure:**

```
/                      → Tournament List (default)
/tournaments           → Tournament List
/tournaments/{id}      → Tournament Details
/games/{id}            → Game Details
/players               → Player List
/players/{id}          → Player Details
/users                 → User List (admin only)
/register              → User Registration
/account               → User Account
/*                     → 404 Page
```

## User Roles and Permissions

### Guest/Anonymous User

- ❌ Cannot access any features
- Must register or login to view content

### Registered User (Non-Admin)

| Feature     | View | Create | Edit | Delete |
| ----------- | ---- | ------ | ---- | ------ |
| Tournaments | ✅   | ❌     | ❌   | ❌     |
| Teams       | ✅   | ❌     | ❌   | ❌     |
| Games       | ✅   | ❌     | ❌   | ❌     |
| Players     | ✅   | ❌     | ❌   | ❌     |
| Stats       | ✅   | ❌     | ❌   | ❌     |
| Users       | ❌   | ❌     | ❌   | ❌     |

### Admin User

| Feature     | View | Create | Edit | Delete |
| ----------- | ---- | ------ | ---- | ------ |
| Tournaments | ✅   | ✅     | ❌   | ✅     |
| Teams       | ✅   | ✅     | ❌   | ✅     |
| Games       | ✅   | ✅     | ❌   | ✅     |
| Players     | ✅   | ✅     | ✅   | ✅     |
| Stats       | ✅   | ✅     | ❌   | ✅     |
| Users       | ✅   | ❌     | ❌   | ❌     |

## Data Model Relationships

```
Tournament (1) ──→ (many) Team
               ──→ (many) Game

Team (1) ──→ (4) Player (via player1Id, player2Id, player3Id, player4Id)

Game (1) ──→ (1) Tournament
         ──→ (1) Team (home)
         ──→ (1) Team (away)
         ──→ (many) Stat

Stat (1) ──→ (1) Game
         ──→ (1) Player

Player (1) ──→ (many) Stat
```

## API Endpoints Reference

### Tournaments

- `GET /services/tournaments` - List all
- `GET /services/tournaments/{id}` - Get one
- `POST /services/tournaments` - Create (admin)
- `DELETE /services/tournaments/{id}` - Delete (admin)

### Teams

- `GET /services/teams?where[tournamentId]={id}` - List by tournament
- `POST /services/teams` - Create (admin)
- `DELETE /services/teams/{id}` - Delete (admin)

### Games

- `GET /services/games?where[tournamentId]={id}` - List by tournament
- `GET /services/games/{id}?withRelated[]=...` - Get with relations
- `POST /services/games` - Create (admin)
- `DELETE /services/games/{id}` - Delete (admin)

### Players

- `GET /services/players?orderBy=name` - List all (ordered)
- `GET /services/players/{id}` - Get one
- `POST /services/players` - Create (admin)
- `PUT /services/players/{id}` - Update (admin)
- `DELETE /services/players/{id}` - Delete (admin)

### Stats

- `GET /services/stats?where[gameId]={id}` - List by game
- `GET /services/stats?where[playerId]={id}&withRelated[]=game.tournament` - List by player
- `POST /services/stats` - Create (admin)
- `DELETE /services/stats/{id}` - Delete (admin)

### Session/Users

- `GET /services/session` - Get current session
- `POST /services/session` - Login
- `DELETE /services/session` - Logout
- `POST /services/users` - Register new user
- `GET /services/users` - List users (admin only)

## Test Execution Guidelines

### Prerequisites

1. **Environment Setup**

   - Docker and Docker Compose installed
   - Or Node.js 6.11.0+ and PostgreSQL 9.5+

2. **Start Application**

   ```bash
   # Using Docker (recommended)
   docker-compose up

   # Or manual setup
   npm install
   npm run db-migrate
   npm start
   ```

3. **Access Application**
   - Docker: http://localhost:5001
   - Manual: http://localhost:5000

### Test Data Setup

1. **Create Admin User**

   - Register user via `/register`
   - Manually set `isAdmin = true` in database
   - Or use pre-seeded admin credentials

2. **Create Test Data**

   - As admin, create a tournament
   - Create 8+ players
   - Create 2 teams (4 players each)
   - Create a game with YouTube video URL
   - Add some stats to the game

3. **Test User Accounts**
   - Admin user: `admin@bitballs.com` / `adminpass123`
   - Regular user: `user@bitballs.com` / `userpass123`

### Recommended Test Order

1. **Start with Authentication** (Document #1)

   - Verify login/logout works
   - Establish admin and regular user sessions

2. **Test Player Management** (Document #2)

   - Create players needed for other tests
   - Verify CRUD operations

3. **Test Tournament Management** (Document #4)

   - Create tournament
   - Create teams
   - Create games
   - Tests complex business logic

4. **Test Game Details** (Document #3)

   - View games created in step 3
   - Test video and stat synchronization
   - Most complex feature

5. **Test Navigation** (Document #5)
   - Verify all cross-entity links work
   - Test edge cases and error handling

## Common Test Patterns

### Confirmation Dialogs

All delete operations require confirmation:

```javascript
window.confirm("Are you sure you want to delete this {entity}?");
```

- Test "OK" → Deletion proceeds
- Test "Cancel" → Deletion aborted

### Form Validation

- Required fields use HTML5 `required` attribute
- Server-side validation for business rules
- Test both client and server validation

### Loading States

- All data fetched via Promises
- Pages show loading indicators
- Test slow network scenarios

### Real-time Updates

- Stats use real-time connection (if implemented)
- Test multi-user scenarios
- Verify data synchronization

## Browser Testing Matrix

| Browser       | Version    | Priority | Notes                       |
| ------------- | ---------- | -------- | --------------------------- |
| Chrome        | Latest     | High     | Primary development browser |
| Firefox       | Latest     | High     | Full feature support        |
| Safari        | Latest     | Medium   | Test on macOS               |
| Edge          | Latest     | Medium   | Test on Windows             |
| Mobile Safari | iOS 12+    | Low      | Responsive design           |
| Mobile Chrome | Android 8+ | Low      | Responsive design           |

## Automated Testing Recommendations

### Unit Tests

- Model validations
- Business logic calculations (scores, percentages)
- URL parsing (YouTube video ID extraction)

### Integration Tests

- API endpoint responses
- Database constraints
- Authentication middleware

### E2E Tests (Based on these documents)

- Critical user paths (registration → create tournament → create game)
- Admin workflows (create/edit/delete operations)
- Video synchronization (game stats with playback)
- Cross-browser navigation

### Test Frameworks

- **E2E**: Playwright, Cypress, or Selenium
- **Component**: DoneJS test utilities
- **API**: Supertest with Mocha/Jest

## Known Issues and Considerations

### Potential Issues to Watch For

1. **YouTube API Loading**

   - May fail if network blocked
   - Requires HTTPS in production
   - Rate limits apply

2. **Video Synchronization**

   - Time cursor updates frequently (50ms when playing)
   - May impact performance with many stats
   - Consider throttling or optimization

3. **Browser Back Button**

   - Video state resets on return
   - Form data may not persist
   - Document expected behavior

4. **Concurrent Edits**

   - No pessimistic locking
   - Last write wins
   - Consider conflict resolution

5. **Mobile Experience**
   - Video controls may be limited
   - Stat creation on mobile may be challenging
   - Consider mobile-optimized flows

## Success Metrics

### Functional Coverage

- ✅ 100% of user-facing features documented
- ✅ All CRUD operations covered
- ✅ All user roles and permissions defined
- ✅ All API endpoints identified
- ✅ All navigation paths mapped

### Test Completeness

- ✅ Happy path scenarios
- ✅ Error handling scenarios
- ✅ Edge cases and boundary conditions
- ✅ Permission enforcement
- ✅ Cross-browser compatibility

## Maintenance and Updates

### When to Update These Documents

1. **New Feature Addition**

   - Add new test flow section
   - Update route table
   - Update permissions matrix

2. **Feature Modification**

   - Update relevant test steps
   - Note breaking changes
   - Update screenshots if applicable

3. **Bug Fix**

   - Add regression test case
   - Document expected vs. actual behavior
   - Update edge cases if needed

4. **API Changes**
   - Update endpoint documentation
   - Update request/response examples
   - Note version compatibility

## Contact and Support

For questions about these test flows or the Bitballs application:

- **Repository**: https://github.com/bitovi/bitballs
- **Documentation**: Run `npm run document` for full API docs
- **Issues**: Submit via GitHub Issues

## Conclusion

These E2E test flow documents provide comprehensive coverage of the Bitballs application from a QA perspective. They should be used as:

- **Testing Guide**: Follow step-by-step to manually test features
- **Test Plan**: Basis for automated test development
- **Documentation**: Reference for understanding application behavior
- **Training**: Onboarding new team members or testers

Regular execution of these test flows ensures the application maintains quality and reliability as it evolves.
