import React, { useState, useEffect } from 'react';
import UpdateManagerForm from './UpdateManagerForm';
import AddManagerForm from './AddManagerForm';
import './ManagerTable.css';

const ManagerTable = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await fetch('http://localhost:3001/manager');
      const data = await response.json();
      setManagers(data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const deleteManager = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this manager?');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/manager/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setManagers(managers.filter(manager => manager.id !== id));
          alert('Manager deleted successfully');
        } else {
          alert('Failed to delete manager');
        }
      } catch (error) {
        console.error('Error deleting manager:', error);
        alert('An error occurred while deleting the manager');
      }
    }
  };

  const handleAdd = async (newManagerData) => {
    try {
      const response = await fetch('http://localhost:3001/manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newManagerData)
      });

      if (response.ok) {
        fetchManagers();
        setShowAddForm(false);
        alert('Manager added successfully');
      } else {
        alert('Failed to add manager');
      }
    } catch (error) {
      console.error('Error adding manager:', error);
      alert('An error occurred while adding the manager');
    }
  };

  const handleUpdate = () => {
    setSelectedManager(null);
    fetchManagers();
  };

  const handleCancel = () => {
    setSelectedManager(null);
    setShowAddForm(false);
  };

  return (
    <div className="container1">
      <nav>
        <div>Employee Management System</div>
        <button className="btn3" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'View Managers' : 'Add Manager'}
        </button>
      </nav>
      {showAddForm && <AddManagerForm onAdd={handleAdd} onCancel={handleCancel} />}
      {selectedManager && (
        <UpdateManagerForm
          manager={selectedManager}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
      {!showAddForm && !selectedManager && (
        <>
          <h1>Manager Table</h1>
          <table>
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>NAME</th>
                <th>ID</th>
                <th>PHONE</th>
                <th>WORKING STATUS</th>
                <th>DEPARTMENT</th>
                <th>ADDRESS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, index) => (
                <tr key={manager.id}>
                  <td>{index + 1}</td>
                  <td>{manager.name}</td>
                  <td>{manager.managerId}</td>
                  <td>{manager.phone}</td>
                  <td>{manager.status ? 'True' : 'False'}</td>
                  <td>{manager.department}</td>
                  <td>{manager.address}</td>
                  <td className='btn1'>
                    <button className="update" onClick={() => setSelectedManager(manager)}>Update</button>
                    <button className="delete" onClick={() => deleteManager(manager.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManagerTable;
