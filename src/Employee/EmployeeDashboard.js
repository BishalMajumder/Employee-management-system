import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddEmployeeForm from './AddEmployeeForm';
import AnnouncementMaster from './AnnouncementMaster';
import LeaveRequestForm from './LeaveRequestForm';
import MessageRequestForm from './MessageRequestForm';
import './AdminDashboard.css';

const EmployeeDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Employee Dashboard</h2>
        <ul>
          <li><Link to="employee-form">Employee Form</Link></li>
          <li><Link to="announcement-master">Announcements</Link></li>
          <li><Link to="leave-request-form">Leave Request</Link></li>
          <li><Link to="message-request-form">Message Request</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<h1>Welcome Employee</h1>} />
          <Route path="employee-form" element={<AddEmployeeForm />} />
          <Route path="announcement-master" element={<AnnouncementMaster />} />
          <Route path="leave-request-form" element={<LeaveRequestForm />} />
          <Route path="message-request-form" element={<MessageRequestForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
