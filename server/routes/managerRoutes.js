// routes/managerRoutes.js
const express = require('express');
const { getAllManagers, addManager, updateManager, deleteManager } = require('../controllers/managerController');

const router = express.Router();

router.get('/', getAllManagers);
router.post('/', addManager);
router.put('/:id', updateManager);
router.delete('/:id', deleteManager);

module.exports = router;
