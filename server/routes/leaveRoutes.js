// routes/leaveRoutes.js
const express = require('express');
const {
  getAllLeaveRequests,
  addLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest
} = require('../controllers/leaveController');

const router = express.Router();

// Route to get all leave requests
router.get('/', getAllLeaveRequests);

// Route to submit a new leave request
router.post('/', addLeaveRequest);

// Route to approve a leave request by employee ID
router.post('/:id/approve', approveLeaveRequest);

// Route to reject a leave request by employee ID
router.post('/:id/reject', rejectLeaveRequest);

module.exports = router;
