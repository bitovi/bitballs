/**
 * Test data generator utilities
 */

/**
 * Generate a unique email address for testing
 * @param {string} prefix - Email prefix (default: 'test')
 * @returns {string} - Unique email address
 */
export function generateUniqueEmail(prefix = "test") {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}@bitballs-test.com`;
}

/**
 * Generate a random password
 * @param {number} length - Password length (default: 12)
 * @returns {string} - Random password
 */
export function generatePassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Test user credentials for different scenarios
 */
export const testUsers = {
  // These would be seeded in the database for testing
  admin: {
    email: "admin@bitballs.com",
    password: "admin123",
  },
  regularUser: {
    email: "user@bitballs.com",
    password: "user123",
  },
};

/**
 * Generate test user data
 * @param {string} role - User role (admin, regular, or new)
 * @returns {Object} - User credentials
 */
export function generateTestUser(role = "new") {
  if (role === "admin" && testUsers.admin) {
    return testUsers.admin;
  }

  if (role === "regular" && testUsers.regularUser) {
    return testUsers.regularUser;
  }

  // Generate new user
  return {
    email: generateUniqueEmail(role),
    password: generatePassword(),
  };
}
