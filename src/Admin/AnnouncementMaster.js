import React, { useState, useEffect } from 'react';

const AnnouncementMaster = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', date: '', description: '' });

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

  const handleInputChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, [e.target.name]: e.target.value });
  };

  const handleAddAnnouncement = async () => {
    try {
      const response = await fetch('http://localhost:3001/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnnouncement),
      });
      if (response.ok) {
        setNewAnnouncement({ title: '', date: '', description: '' });
        fetchAnnouncements();
      } else {
        console.error('Failed to add announcement');
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/announcements/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchAnnouncements();
      } else {
        console.error('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h1>Announcement Master</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td>{announcement.title}</td>
              <td>{formatDate(announcement.date)}</td>
              <td>{announcement.description}</td>
              <td>
                <button onClick={() => handleDeleteAnnouncement(announcement.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add New Announcement</h2>
        <input type="text" name="title" value={newAnnouncement.title} onChange={handleInputChange} placeholder="Title" />
        <input type="date" name="date" value={newAnnouncement.date} onChange={handleInputChange} />
        <textarea name="description" value={newAnnouncement.description} onChange={handleInputChange} placeholder="Description"></textarea>
        <button onClick={handleAddAnnouncement}>Add Announcement</button>
      </div>
    </div>
  );
};

export default AnnouncementMaster;
