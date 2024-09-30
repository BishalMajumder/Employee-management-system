const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure PostgreSQL client
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'bishal@2002',
  database: 'employee_management'
});

// Connect to PostgreSQL database
client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Admin Login route
app.post('/adminlogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM admin WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Employee');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employees', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new employee
app.post('/employees', async (req, res) => {
  const { name, empId, phone, status, department, address } = req.body;

  try {
    await client.query('INSERT INTO Employee (name, empId, phone, status, department, address) VALUES ($1, $2, $3, $4, $5, $6)', [name, empId, phone, status, department, address]);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    console.error('Error adding employee', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});
// Update employee
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, empId, phone, status, department, address } = req.body;

  try {
    await client.query('UPDATE Employee SET name = $1, empId = $2, phone = $3, status = $4, department = $5, address = $6 WHERE id = $7', [name, empId, phone, status, department, address, id]);
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Error updating employee', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete employee
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await client.query('DELETE FROM Employee WHERE id = $1', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

///Manager 
//show manager table
app.get('/manager', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM manager');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching manager', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});
//add manager
app.post('/manager', async (req, res) => {
  const {mngid, name, phone, status, department, address } = req.body;

  try {
    await client.query('INSERT INTO manager (mngid, name, phone, status, department, address) VALUES ($1, $2, $3, $4, $5, $6)', [mngid, name, phone, status, department, address]);
    res.status(201).json({ message: 'Manager added successfully' });
  } catch (err) {
    console.error('Error adding manager', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});
// Update manager
app.put('/manager/:id', async (req, res) => {
  const { id } = req.params;
  const { mngid, name, phone, status, department, address } = req.body;

  // Input validation
  if (!id || !mngid || !name || !phone || !department || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await client.query(
      'UPDATE manager SET mngid = $1, name = $2, phone = $3, status = $4, department = $5, address = $6 WHERE id = $7',
      [mngid, name, phone, status, department, address, id]
    );
    res.json({ message: 'Manager updated successfully' });
  } catch (err) {
    console.error('Error updating manager', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});
// Delete manager
app.delete('/manager/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await client.query('DELETE FROM manager WHERE id = $1', [id]);
    res.json({ message: 'Manager deleted successfully' });
  } catch (err) {
    console.error('Error deleting Manager', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all announcements
app.get('/announcements', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM announcements');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/announcements', async (req, res) => {
  const { title, date, description } = req.body;
  try {
    await client.query('INSERT INTO announcements (title, date, description) VALUES ($1, $2, $3)', [title, date, description]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error adding announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an announcement by ID
app.delete('/announcements/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM announcements WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch leave requests
app.get('/leaverequests', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM leave_requests');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/leaverequests/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('UPDATE leave_requests SET status = $1 WHERE emp_id = $2', ['Approved', id]);
    res.send('Leave request approved');
  } catch (error) {
    console.error('Error approving leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/leaverequests/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('UPDATE leave_requests SET status = $1 WHERE emp_id = $2', ['Rejected', id]);
    res.send('Leave request rejected');
  } catch (error) {
    console.error('Error rejecting leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/leaverequests', async (req, res) => {
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
});

// Fetch message requests
app.get('/message_requests', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM message_requests');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching message requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reply to a message request
app.post('/message_requests/:id/reply', async (req, res) => {
  const { id } = req.params;
  const { admin_reply } = req.body;

  try {
    await client.query('UPDATE message_requests SET admin_reply = $1 WHERE id = $2', [admin_reply, id]);
    res.send('Reply sent successfully');
  } catch (error) {
    console.error('Error replying to message request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle message request form submission
app.post('/message_requests', async (req, res) => {
  const { emp_id, department, emp_name, message } = req.body;

  try {
    const query = `
      INSERT INTO message_requests (emp_id, department, emp_name, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [emp_id, department, emp_name, message];

    const result = await client.query(query, values);

    res.json(result.rows[0]); // Return the inserted message request
  } catch (error) {
    console.error('Error submitting message request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
