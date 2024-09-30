// routes/adminRoutes.js
const express = require('express');
const { adminLogin, getAllAdmins, addAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/', getAllAdmins);
router.post('/', addAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;
