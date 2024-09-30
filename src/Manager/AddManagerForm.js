import React, { useState } from 'react';
import './AddManagerForm.css';

const AddManagerForm = () => {
  const [mngid, setMngid] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(false); // Assuming status is a boolean
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const managerData = {
      mngid,
      name,
      phone,
      status,
      department,
      address
    };

    try {
      const response = await fetch('http://localhost:3001/manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(managerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Manager added successfully!');
      // Reset form fields
      setMngid('');
      setName('');
      setPhone('');
      setStatus(false);
      setDepartment('');
      setAddress('');
      
    } catch (error) {
      console.error('Error adding manager:', error);
      alert('Failed to add manager.');
    }
  };

  return (
    <div className="add-manager-form">
      <h2>Add Manager</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Manager ID:</label>
          <input
            type="text"
            value={mngid}
            onChange={(e) => setMngid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Manager</button>
      </form>
    </div>
  );
};

export default AddManagerForm;
