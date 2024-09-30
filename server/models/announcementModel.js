// models/announcementModel.js
const client = require('../config/db');

// Get all announcements
exports.getAllAnnouncements = async () => {
  try {
    const result = await client.query('SELECT * FROM announcements');
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching announcements: ${err.message}`);
  }
};

// Get an announcement by ID
exports.getAnnouncementById = async (id) => {
  try {
    const result = await client.query('SELECT * FROM announcements WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching announcement by ID: ${err.message}`);
  }
};

// Add a new announcement
exports.addAnnouncement = async (title, date, description) => {
  try {
    await client.query(
      'INSERT INTO announcements (title, date, description) VALUES ($1, $2, $3)',
      [title, date, description]
    );
  } catch (err) {
    throw new Error(`Error adding announcement: ${err.message}`);
  }
};

// Update an announcement
exports.updateAnnouncement = async (id, title, date, description) => {
  try {
    await client.query(
      'UPDATE announcements SET title = $1, date = $2, description = $3 WHERE id = $4',
      [title, date, description, id]
    );
  } catch (err) {
    throw new Error(`Error updating announcement: ${err.message}`);
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (id) => {
  try {
    await client.query('DELETE FROM announcements WHERE id = $1', [id]);
  } catch (err) {
    throw new Error(`Error deleting announcement: ${err.message}`);
  }
};
