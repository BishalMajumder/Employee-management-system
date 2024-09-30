// controllers/leaveController.js
const client = require('../config/db');

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM leave_requests');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new leave request
exports.addLeaveRequest = async (req, res) => {
  const { emp_id, name, department, start_date, end_date, date_applied, purpose, status } = req.body;

  try {
    await client.query(
      'INSERT INTO leave_requests (emp_id, name, department, start_date, end_date, date_applied, purpose, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [emp_id, name, department, start_date, end_date, date_applied, purpose, status]
    );
    res.status(201).send('Leave request created successfully');
  } catch (error) {
    console.error('Error creating leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Approve a leave request
exports.approveLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await client.query('UPDATE leave_requests SET status = $1 WHERE emp_id = $2', ['Approved', id]);
    res.send('Leave request approved');
  } catch (error) {
    console.error('Error approving leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reject a leave request
exports.rejectLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await client.query('UPDATE leave_requests SET status = $1 WHERE emp_id = $2', ['Rejected', id]);
    res.send('Leave request rejected');
  } catch (error) {
    console.error('Error rejecting leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
