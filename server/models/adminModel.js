// models/adminModel.js
const client = require('../config/db');

// Get all admins
exports.getAllAdmins = async () => {
  try {
    const result = await client.query('SELECT * FROM admin');
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching admins: ${err.message}`);
  }
};

// Get an admin by username and password (for login)
exports.getAdminByCredentials = async (username, password) => {
  try {
    const result = await client.query(
      'SELECT * FROM admin WHERE username = $1 AND password = $2',
      [username, password]
    );
    return result.rows[0]; // Return the first matching admin
  } catch (err) {
    throw new Error(`Error fetching admin by credentials: ${err.message}`);
  }
};

// Add a new admin
exports.addAdmin = async (username, password, name) => {
  try {
    await client.query(
      'INSERT INTO admin (username, password, name) VALUES ($1, $2, $3)',
      [username, password, name]
    );
  } catch (err) {
    throw new Error(`Error adding admin: ${err.message}`);
  }
};

// Update an existing admin by ID
exports.updateAdmin = async (id, username, password, name) => {
  try {
    await client.query(
      'UPDATE admin SET username = $1, password = $2, name = $3 WHERE id = $4',
      [username, password, name, id]
    );
  } catch (err) {
    throw new Error(`Error updating admin: ${err.message}`);
  }
};

// Delete an admin by ID
exports.deleteAdmin = async (id) => {
  try {
    await client.query('DELETE FROM admin WHERE id = $1', [id]);
  } catch (err) {
    throw new Error(`Error deleting admin: ${err.message}`);
  }
};
