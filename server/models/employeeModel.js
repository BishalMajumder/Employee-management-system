// models/employeeModel.js
const client = require('../config/db');

// Get all employees
exports.getAllEmployees = async () => {
  try {
    const result = await client.query('SELECT * FROM Employee');
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching employees: ${err.message}`);
  }
};

// Get an employee by ID
exports.getEmployeeById = async (id) => {
  try {
    const result = await client.query('SELECT * FROM Employee WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error fetching employee by ID: ${err.message}`);
  }
};

// Add a new employee
exports.addEmployee = async (name, empId, phone, status, department, address) => {
  try {
    await client.query(
      'INSERT INTO Employee (name, empId, phone, status, department, address) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, empId, phone, status, department, address]
    );
  } catch (err) {
    throw new Error(`Error adding employee: ${err.message}`);
  }
};

// Update an employee
exports.updateEmployee = async (id, name, empId, phone, status, department, address) => {
  try {
    await client.query(
      'UPDATE Employee SET name = $1, empId = $2, phone = $3, status = $4, department = $5, address = $6 WHERE id = $7',
      [name, empId, phone, status, department, address, id]
    );
  } catch (err) {
    throw new Error(`Error updating employee: ${err.message}`);
  }
};

// Delete an employee
exports.deleteEmployee = async (id) => {
  try {
    await client.query('DELETE FROM Employee WHERE id = $1', [id]);
  } catch (err) {
    throw new Error(`Error deleting employee: ${err.message}`);
  }
};
