const bcrypt = require('bcrypt-nodejs');

exports.up = function(db, callback) {
  // Create test admin user
  const adminEmail = 'admin@bitballs.com';
  const adminPassword = 'testpassword123';
  const userEmail = 'user@bitballs.com';
  const userPassword = 'testpassword123';

  // Hash passwords
  const adminHashedPassword = bcrypt.hashSync(adminPassword);
  const userHashedPassword = bcrypt.hashSync(userPassword);

  // Insert admin user
  db.runSql(
    `INSERT INTO users (email, password, "isAdmin", name) VALUES (?, ?, ?, ?)`,
    [adminEmail, adminHashedPassword, true, 'Test Admin'],
    function(err) {
      if (err) {
        console.error('Failed to create admin user:', err);
        return callback(err);
      }
      
      // Insert regular user
      db.runSql(
        `INSERT INTO users (email, password, "isAdmin", name) VALUES (?, ?, ?, ?)`,
        [userEmail, userHashedPassword, false, 'Test User'],
        function(err) {
          if (err) {
            console.error('Failed to create regular user:', err);
            return callback(err);
          }
          
          console.log('E2E test users created successfully');
          callback();
        }
      );
    }
  );
};

exports.down = function(db, callback) {
  // Remove test users
  db.runSql(
    `DELETE FROM users WHERE email IN (?, ?)`,
    ['admin@bitballs.com', 'user@bitballs.com'],
    callback
  );
};