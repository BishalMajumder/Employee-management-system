// Import core dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();

// Set the port from environment or default to 3001
const port = process.env.PORT || 3001;

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

// Database connection
const pool = require('./config/db');
pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Handle URL-encoded data

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/leaverequests', leaveRoutes);
app.use('/api/announcements', announcementRoutes);

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve React's index.html on any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
