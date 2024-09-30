const managerModel = require('../models/managerModel');

// Get all managers
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await managerModel.getAllManagers();
    res.json(managers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get manager by ID
exports.getManagerById = async (req, res) => {
  const { id } = req.params;

  try {
    const manager = await managerModel.getManagerById(id);
    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: 'Manager not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new manager
exports.addManager = async (req, res) => {
  const { mngid, name, phone, status, department, address } = req.body;

  try {
    await managerModel.addManager(mngid, name, phone, status, department, address);
    res.status(201).json({ message: 'Manager added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update manager
exports.updateManager = async (req, res) => {
  const { id } = req.params;
  const { mngid, name, phone, status, department, address } = req.body;

  try {
    await managerModel.updateManager(id, mngid, name, phone, status, department, address);
    res.json({ message: 'Manager updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete manager
exports.deleteManager = async (req, res) => {
  const { id } = req.params;

  try {
    await managerModel.deleteManager(id);
    res.json({ message: 'Manager deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
