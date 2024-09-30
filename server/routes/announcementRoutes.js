// routes/announcementRoutes.js
const express = require('express');
const {
  getAllAnnouncements,
  addAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');

const router = express.Router();

router.get('/', getAllAnnouncements);
router.post('/', addAnnouncement);
router.delete('/:id', deleteAnnouncement);

module.exports = router;
