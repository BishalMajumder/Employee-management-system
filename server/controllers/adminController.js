const adminModel = require('../models/adminModel');

// Admin login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await adminModel.getAdminByCredentials(username, password);
    if (admin) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.getAllAdmins();
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new admin
exports.addAdmin = async (req, res) => {
  const { username, password, name } = req.body;

  try {
    await adminModel.addAdmin(username, password, name);
    res.status(201).json({ message: 'Admin added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password, name } = req.body;

  try {
    await adminModel.updateAdmin(id, username, password, name);
    res.json({ message: 'Admin updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    await adminModel.deleteAdmin(id);
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
