import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import AdminLogin from './Admin/AdminLogin';
import EmployeeLogin from './Employee/EmployeeLogin';
import ManagerLogin from './Manager/ManagerLogin';
import AdminDashboard from './Admin/AdminDashboard';
import EmployeeDashboard from './Employee/EmployeeDashboard';
import ManagerDashboard from './Manager/ManagerDashboard';
const HomePage = () => {
  const navigate = useNavigate();

  const goToAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <p>Welcome to the Employee Management System homepage. Please select your role:</p>
      <div className="options">
        <button onClick={goToAdminLogin} className="link-button">Admin</button>
        <Link to="/employee-login" className="link-button">Employee</Link>
        <Link to="/manager-login" className="link-button">Manager</Link>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/Employee-dashboard/*" element={<EmployeeDashboard />} />
        <Route path="/Manager-dashboard/*" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
