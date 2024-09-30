const { Client } = require('pg');

// Configure the PostgreSQL client
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'bishal@2002',
  database: 'employee_management'
});

// Connect to the PostgreSQL database
client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
    
    // Query the database
    client.query('SELECT * FROM admin', (err, res) => { // Replace 'employees' with your actual table name
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log('Query results:');
        console.table(res.rows); // Display the results as a table in the console
      }

      // Close the database connection
      client.end(err => {
        if (err) {
          console.error('Error disconnecting', err.stack);
        } else {
          console.log('Disconnected from the database');
        }
      });
    });
  }
});
