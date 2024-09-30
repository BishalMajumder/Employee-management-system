import React, { useState, useEffect } from 'react';

const AnnouncementMaster = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:3001/announcements');
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Handle the error condition here, such as displaying an error message to the user
    }
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h1>Announcements</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{announcement.title}</td>
              <td>{formatDate(announcement.date)}</td>
              <td>{announcement.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementMaster;
