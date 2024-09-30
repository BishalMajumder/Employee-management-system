import React, { useState } from 'react';
import './MessageRequestForm.css';

const MessageRequestForm = () => {
  const [formData, setFormData] = useState({
    emp_id: '',
    department: '',
    emp_name: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/message_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Message request submitted successfully!');
        setFormData({
          emp_id: '',
          department: '',
          emp_name: '',
          message: '',
        });
      } else {
        const errorText = await response.text();
        console.error('Error submitting message request:', errorText);
        alert('Failed to submit message request.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit message request.');
    }
  };

  return (
    <div className="message-request-form">
      <h2>Submit Message Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emp_id">Employee ID:</label>
          <input
            type="text"
            id="emp_id"
            name="emp_id"
            value={formData.emp_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emp_name">Employee Name:</label>
          <input
            type="text"
            id="emp_name"
            name="emp_name"
            value={formData.emp_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MessageRequestForm;
