import React, { useEffect, useState } from 'react';
import './MessageRequest.css';

const MessageRequest = () => {
  const [messageRequests, setMessageRequests] = useState([]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchMessageRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/message_requests');
        const data = await response.json();
        setMessageRequests(data);
      } catch (error) {
        console.error('Error fetching message requests:', error);
      }
    };

    fetchMessageRequests();
  }, []);

  const handleReply = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/message_requests/${id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_reply: replyText }),
      });

      if (response.ok) {
        // Update the message request with the new admin reply
        setMessageRequests(prevRequests =>
          prevRequests.map(request =>
            request.id === id ? { ...request, admin_reply: replyText } : request
          )
        );
        setReplyText('');
        alert('Reply sent successfully!');
      } else {
        console.error('Error sending reply');
        alert('Failed to send reply.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send reply.');
    }
  };

  return (
    <div className="message-request">
      <h2>Message Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Department</th>
            <th>Employee Name</th>
            <th>Message</th>
            <th>Admin Reply</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messageRequests.map(request => (
            <tr key={request.id}>
              <td>{request.emp_id}</td>
              <td>{request.department}</td>
              <td>{request.emp_name}</td>
              <td>{request.message}</td>
              <td>{request.admin_reply || 'No reply yet'}</td>
              <td>
                {request.admin_reply ? (
                  <span>Replied</span>
                ) : (
                  <>
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                    />
                    <button onClick={() => handleReply(request.id)}>Reply</button>
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

export default MessageRequest;
