import React, { useEffect, useState } from 'react';
import './LeaveRequest.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }; 
const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/leaverequests');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleAction = async (empId, action) => {
    try {
      const response = await fetch(`http://localhost:3001/leaverequests/${empId}/${action}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setLeaveRequests(prevRequests =>
        prevRequests.map(request =>
          request.emp_id === empId ? { ...request, status: action === 'approve' ? 'Approved' : 'Rejected' } : request
        )
      );
    } catch (error) {
      console.error('Error updating leave request status:', error);
    }
  };
  return (
    <div className="leave-request">
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Date Applied</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request.emp_id}>
              <td>{request.emp_id}</td>
              <td>{request.name}</td>
              <td>{request.department}</td>
              <td>{formatDate(request.start_date)}</td>
              <td>{formatDate(request.end_date)}</td>
              <td>{formatDate(request.date_applied)}</td>
              <td>{request.purpose}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Pending' && (
                  <>
                    <button onClick={() => handleAction(request.emp_id, 'approve')}>Approve</button>
                    <button onClick={() => handleAction(request.emp_id, 'reject')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequest;
