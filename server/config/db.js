// config/db.js
const { Pool } = require('pg');
require('dotenv').config(); 

// Configure PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || 'bishal@2002',
  database: process.env.DB_NAME || 'employee_management',
  max: 10, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
    release(); 
  }
});

module.exports = pool;
