# Authentication Flow - E2E Test Documentation

## Overview

The Bitballs application provides user authentication through registration, login, and logout functionality accessed via a dropdown menu in the navigation bar.

## Test Flow: User Registration

### Entry Point

- **URL**: `http://localhost:5001/register`
- **Navigation**: Click "Session" dropdown in top navigation → Select "Register"

### Test Steps

1. **Navigate to Registration Page**

   - Click on "Session" dropdown menu in the top navigation bar
   - Select "Register" option
   - Verify URL changes to `/register`
   - Verify page title shows "BitBalls | Account"

2. **View Registration Form**

   - Verify form contains the following fields:
     - Email input field (required)
     - Password input field (required, type="password")
     - Verify Password input field (required, type="password")
   - Verify "Create Account" submit button is present

3. **Test Form Validation - Empty Submission**

   - Leave all fields empty
   - Click "Create Account" button
   - Verify browser validation prevents submission (HTML5 required attribute)
   - Verify appropriate error messages are displayed

4. **Test Form Validation - Mismatched Passwords**

   - Enter email: `test@example.com`
   - Enter password: `password123`
   - Enter verify password: `password456`
   - Click "Create Account" button
   - Expected: Validation error indicating passwords don't match

5. **Test Form Validation - Invalid Email Format**

   - Enter email: `invalid-email`
   - Enter password: `password123`
   - Enter verify password: `password123`
   - Click "Create Account" button
   - Expected: Browser validation error for invalid email format

6. **Test Successful Registration**
   - Enter valid email: `newuser@example.com`
   - Enter password: `securepass123`
   - Enter verify password: `securepass123`
   - Click "Create Account" button
   - Expected outcomes:
     - User account is created in the database
     - User is automatically logged in
     - Session is established
     - Navigation dropdown shows user's email
     - User is redirected or remains on account page

### Expected Elements

- **Form Fields**:

  ```html
  <input type="email" name="email" required />
  <input type="password" name="password" required />
  <input type="password" name="verifyPassword" required />
  <button type="submit">Create Account</button>
  ```

- **Navigation after registration**:
  - Session dropdown should display logged-in user email
  - "Logout" option should be available

## Test Flow: User Login

### Entry Point

- **URL**: `http://localhost:5001/` (any page)
- **Navigation**: Click "Session" dropdown in top navigation

### Test Steps

1. **Access Login Form**

   - Click on "Session" dropdown in navigation bar
   - Verify dropdown displays login form inline
   - Verify form contains:
     - Email input field
     - Password input field
     - "Login" submit button

2. **Test Login - Invalid Credentials**

   - Enter email: `wrong@example.com`
   - Enter password: `wrongpassword`
   - Click "Login" button
   - Expected: Error message indicating invalid credentials
   - Verify user remains logged out

3. **Test Login - Empty Fields**

   - Leave email empty
   - Leave password empty
   - Click "Login" button
   - Expected: Browser validation prevents submission

4. **Test Login - Valid Credentials**
   - Enter registered email: `newuser@example.com`
   - Enter correct password: `securepass123`
   - Click "Login" button
   - Expected outcomes:
     - Dropdown closes automatically
     - Session is established
     - Navigation shows logged-in state
     - User email appears in Session dropdown
     - "Logout" option becomes available

### Expected Behavior

- **Before Login**:

  - Session dropdown shows login form
  - "Register" link is visible

- **After Successful Login**:
  - Session dropdown shows user email
  - "Logout" button is visible
  - Login form is hidden

## Test Flow: User Logout

### Prerequisites

- User must be logged in

### Test Steps

1. **Access Logout Option**

   - Verify user is currently logged in (email shown in dropdown)
   - Click "Session" dropdown
   - Verify "Logout" option is present

2. **Perform Logout**

   - Click "Logout" button/link
   - Expected outcomes:
     - Session is destroyed
     - Navigation returns to logged-out state
     - Session dropdown shows login form again
     - User remains on current page

3. **Verify Logout State**
   - Click "Session" dropdown again
   - Verify login form is displayed
   - Verify "Register" link is visible
   - Verify user email is no longer shown

## Test Flow: Session Persistence

### Test Steps

1. **Login and Verify Session**

   - Login with valid credentials
   - Note the current page URL

2. **Test Page Navigation with Active Session**

   - Navigate to different pages (tournaments, players, etc.)
   - Verify session persists across page changes
   - Verify user email remains in Session dropdown

3. **Test Page Refresh with Active Session**

   - While logged in, refresh the page (F5 or Cmd+R)
   - Expected: User remains logged in after refresh
   - Verify session state is restored from cookies/server

4. **Test Direct URL Access When Logged In**
   - Copy a deep URL (e.g., `/players` or `/tournaments/1`)
   - Open in new tab or refresh
   - Verify user session is maintained

## Admin User Testing

### Test Steps

1. **Login as Admin User**

   - Login with admin credentials (if applicable)
   - Verify admin-specific features are visible

2. **Verify Admin Privileges**

   - Check for admin-only UI elements:
     - Edit buttons on lists
     - Delete buttons
     - Create new tournament/player buttons
   - Attempt admin-only actions

3. **Compare with Regular User**
   - Logout admin user
   - Login as regular user
   - Verify admin-specific features are hidden

## API Endpoints Tested

- `POST /services/session` - Create session (login)
- `GET /services/session` - Get current session
- `DELETE /services/session` - Destroy session (logout)
- `POST /services/users` - Create new user (registration)

## Security Considerations

### Tests to Verify

1. **Password Security**

   - Verify password field uses `type="password"` (masked input)
   - Verify passwords are not visible in network requests (should be encrypted/hashed)

2. **Session Security**

   - Verify session cookies are HttpOnly (check browser dev tools)
   - Verify session expires after logout
   - Test that expired sessions redirect to login

3. **Authorization**
   - Attempt to access admin features as regular user
   - Verify appropriate error handling for unauthorized access

## Edge Cases to Test

1. **Concurrent Sessions**

   - Login in multiple tabs/browsers
   - Logout in one tab, verify state in other tabs

2. **Network Errors**

   - Simulate network failure during login/registration
   - Verify appropriate error messages

3. **XSS Protection**

   - Attempt to inject JavaScript in email field
   - Verify input is sanitized

4. **SQL Injection Protection**
   - Attempt SQL injection patterns in login fields
   - Verify application handles safely

## Test Data

### Valid Test Users

- Email: `newuser@example.com`, Password: `securepass123`
- Email: `admin@bitballs.com`, Password: `adminpass123` (if admin exists)

### Invalid Test Cases

- Invalid email formats: `notanemail`, `@example.com`, `user@`
- Empty fields
- Mismatched passwords
- SQL injection attempts: `admin' OR '1'='1`
- XSS attempts: `<script>alert('xss')</script>`

## Success Criteria

✅ User can successfully register with valid credentials  
✅ User cannot register with invalid email format  
✅ User cannot register with mismatched passwords  
✅ User can login with valid credentials  
✅ User cannot login with invalid credentials  
✅ User can logout successfully  
✅ Session persists across page navigation  
✅ Session persists after page refresh  
✅ Admin users see admin-specific features  
✅ Regular users do not see admin-specific features  
✅ Passwords are properly masked and secured  
✅ Input validation prevents malicious data entry
