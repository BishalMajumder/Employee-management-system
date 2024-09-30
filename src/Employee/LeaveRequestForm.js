import React, { useState } from 'react';
import './LeaveRequestForm.css';

const LeaveRequestForm = () => {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const leaveRequest = {
      emp_id: empId,
      name,
      department,
      start_date: startDate,
      end_date: endDate,
      date_applied: dateApplied,
      purpose,
      status: 'Pending' // default status when a new leave request is created
    };

    try {
      const response = await fetch('http://localhost:3001/leaverequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Leave request submitted successfully!');
      // Reset form fields
      setEmpId('');
      setName('');
      setDepartment('');
      setStartDate('');
      setEndDate('');
      setDateApplied('');
      setPurpose('');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request.');
    }
  };

  return (
    <div className="leave-request-form">
      <h2>Submit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Emp ID:</label>
          <input
            type="text"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
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
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date Applied:</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Purpose:</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
