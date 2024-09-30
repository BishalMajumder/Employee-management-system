// models/managerModel.js
const client = require('../config/db');

// Get all managers
exports.getAllManagers = async () => {
  try {
    const result = await client.query('SELECT * FROM manager');
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching managers: ${err.message}`);
  }
};

// Get a manager by ID
exports.getManagerById = async (id) => {
  try {
    const result = await client.query('SELECT * FROM manager WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching manager by ID: ${err.message}`);
  }
};

// Add a new manager
exports.addManager = async (mngid, name, phone, status, department, address) => {
  try {
    await client.query(
      'INSERT INTO manager (mngid, name, phone, status, department, address) VALUES ($1, $2, $3, $4, $5, $6)',
      [mngid, name, phone, status, department, address]
    );
  } catch (err) {
    throw new Error(`Error adding manager: ${err.message}`);
  }
};

// Update an existing manager
exports.updateManager = async (id, mngid, name, phone, status, department, address) => {
  try {
    await client.query(
      'UPDATE manager SET mngid = $1, name = $2, phone = $3, status = $4, department = $5, address = $6 WHERE id = $7',
      [mngid, name, phone, status, department, address, id]
    );
  } catch (err) {
    throw new Error(`Error updating manager: ${err.message}`);
  }
};

// Delete a manager
exports.deleteManager = async (id) => {
  try {
    await client.query('DELETE FROM manager WHERE id = $1', [id]);
  } catch (err) {
    throw new Error(`Error deleting manager: ${err.message}`);
  }
};
