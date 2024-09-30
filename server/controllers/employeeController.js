const employeeModel = require('../models/employeeModel');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await employeeModel.getEmployeeById(id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
  const { name, empId, phone, status, department, address } = req.body;

  try {
    await employeeModel.addEmployee(name, empId, phone, status, department, address);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, empId, phone, status, department, address } = req.body;

  try {
    await employeeModel.updateEmployee(id, name, empId, phone, status, department, address);
    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await employeeModel.deleteEmployee(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
