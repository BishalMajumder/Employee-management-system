// routes/employeeRoutes.js
const express = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Route to get all employees
router.get('/', getAllEmployees);

// Route to get a specific employee by ID
router.get('/:id', getEmployeeById);

// Route to add a new employee
router.post('/', addEmployee);

// Route to update an existing employee by ID
router.put('/:id', updateEmployee);

// Route to delete an employee by ID
router.delete('/:id', deleteEmployee);

module.exports = router;
