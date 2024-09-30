import React, { useState, useEffect } from 'react';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import AddEmployeeForm from './AddEmployeeForm';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);
  const deleteEmployee = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/employees/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setEmployees(employees.filter(employee => employee.id !== id));
          alert('Employee deleted successfully');
        } else {
          alert('Failed to delete employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('An error occurred while deleting the employee');
      }
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAdd = async (newEmployeeData) => {
    try {
      const response = await fetch('http://localhost:3001/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployeeData)
      });

      if (response.ok) {
        fetchEmployees();
        setShowAddForm(false);
        alert('Employee added successfully');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('An error occurred while adding the employee');
    }
  };

  const handleUpdate = () => {
    setSelectedEmployee(null);
    fetchEmployees();
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowAddForm(false);
  };

  return (
    <div className="container1">
      <nav>
        <div>Employee Management System</div>
        <button className="btn3" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'View Employees' : 'Add Employee'}
        </button>
      </nav>
      {showAddForm && <AddEmployeeForm onAdd={handleAdd} onCancel={handleCancel} />}
      {selectedEmployee && (
        <UpdateEmployeeForm
          employee={selectedEmployee}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
      {!showAddForm && !selectedEmployee && (
        <>
          <h1>Employees Table</h1>
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
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.empid}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.status ? 'True' : 'False'}</td>
                  <td>{employee.department}</td>
                  <td>{employee.address}</td>
                  <td className='btn1'>
                    <button className="update" onClick={() => setSelectedEmployee(employee)}>Update</button>
                    <button className="delete" onClick={() => deleteEmployee(employee.id)}>Delete</button>
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

export default EmployeeTable;
