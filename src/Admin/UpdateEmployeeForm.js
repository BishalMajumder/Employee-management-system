import React, { useState, useEffect } from 'react';
import './UpdateEmployeeForm.css'; // Changed CSS file name

const UpdateEmployeeForm = ({ employee, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    phone: '',
    status: false,
    department: '',
    address: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        empId: employee.empid,
        phone: employee.phone,
        status: employee.status,
        department: employee.department,
        address: employee.address
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onUpdate();
        alert('Employee updated successfully');
      } else {
        alert('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="update-container"> {/* Changed container class name */}
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          Employee Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Employee ID:
          <input
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Employee Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Working
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="update-button">Update Employee</button> {/* Changed button class name */}
        <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button> {/* Changed button class name */}
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
