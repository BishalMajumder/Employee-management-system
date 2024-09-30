import React, { useState, useEffect } from 'react';
import './UpdateEmployeeForm.css'; // Same CSS file for consistency

const UpdateManagerForm = ({ manager, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    mngid: '', // Ensure this matches the server field name
    name: '',
    phone: '',
    status: false,
    department: '',
    address: ''
  });

  useEffect(() => {
    if (manager) {
      setFormData({
        mngid: manager.mngid,
        name: manager.name,
        phone: manager.phone,
        status: manager.status,
        department: manager.department,
        address: manager.address
      });
    }
  }, [manager]);

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
      const response = await fetch(`http://localhost:3001/manager/${manager.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onUpdate();
        alert('Manager updated successfully');
      } else {
        const errorText = await response.text();
        console.error('Failed to update manager:', errorText);
        alert(`Failed to update manager: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating manager:', error);
      alert(`Error updating manager: ${error.message}`);
    }
  };

  return (
    <div className="update-container"> {/* Same container class name */}
      <h1>Update Manager</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          Manager Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Manager ID:
          <input
            type="text"
            name="mngid"
            value={formData.mngid}
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
          Manager Address:
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
          Active
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
        <button type="submit" className="update-button">Update Manager</button> {/* Same button class name */}
        <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button> {/* Same button class name */}
      </form>
    </div>
  );
};

export default UpdateManagerForm;
