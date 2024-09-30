const announcementModel = require('../models/announcementModel');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementModel.getAllAnnouncements();
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await announcementModel.getAnnouncementById(id);
    if (announcement) {
      res.json(announcement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new announcement
exports.addAnnouncement = async (req, res) => {
  const { title, date, description } = req.body;

  try {
    await announcementModel.addAnnouncement(title, date, description);
    res.status(201).json({ message: 'Announcement added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update announcement
exports.updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, date, description } = req.body;

  try {
    await announcementModel.updateAnnouncement(id, title, date, description);
    res.json({ message: 'Announcement updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    await announcementModel.deleteAnnouncement(id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
