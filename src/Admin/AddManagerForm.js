// src/AddManagerForm.js

import React, { useState } from 'react';
import './AddManagerForm.css';

const AddManagerForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    mngid: '',
    name: '',
    phone: '',
    status: false,
    department: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="add-container">
      <h1>Add Manager</h1>
      <form onSubmit={handleSubmit} className="add-form1">
        <label className='add-form1'>
          Manager ID:
          <input
            type="text"
            name="mngid"
            value={formData.mngid}
            onChange={handleChange}
            required
          />
        </label>
        <label className='add-form1'>
          Manager Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className='add-form1'>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label className='add-form1'>
          Manager Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label className='boxa'>
          <input className='boxa1'
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Working
        </label>
        <label className='add-form1'>
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="update-button">Add Manager</button>
        <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddManagerForm;
