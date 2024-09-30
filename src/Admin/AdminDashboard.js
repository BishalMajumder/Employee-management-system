import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import ManagerTable from './ManagerTable';
import AnnouncementMaster from './AnnouncementMaster';
import LeaveRequest from './LeaveRequest';
import MessageRequest from './MessageRequest';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="employee-master">Employee Master</Link></li>
          <li><Link to="manager-master">Manager Master</Link></li>
          <li><Link to="announcement-master">Announcement Master</Link></li>
          <li><Link to="leave-request">Leave Request</Link></li>
          <li><Link to="message-request">Message Request</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<h1>Welcome Administrator</h1>} />
          <Route path="employee-master" element={<EmployeeTable />} />
          <Route path="manager-master" element={<ManagerTable />} />
          <Route path="announcement-master" element={<AnnouncementMaster />} />
          <Route path="leave-request" element={<LeaveRequest />} />
          <Route path="message-request" element={<MessageRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
