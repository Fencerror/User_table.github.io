import React, { useState, useRef } from 'react';
import './DataTable.css';

const DataTable = ({ users, onRowClick }) => {
  const [columnWidths, setColumnWidths] = useState({
    firstName: 150,
    lastName: 150,
    age: 100,
    gender: 100,
    phone: 150,
    address: 200,
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const startX = useRef(0);
  const startWidth = useRef(0);
  const resizingColumn = useRef(null);

  const handleMouseDown = (e, column) => {
    startX.current = e.clientX;
    startWidth.current = columnWidths[column];
    resizingColumn.current = column;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (resizingColumn.current) {
      const newWidth = Math.max(startWidth.current + (e.clientX - startX.current), 50);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [resizingColumn.current]: newWidth,
      }));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    resizingColumn.current = null;
  };

  const sortArray = (array, key, direction) => {
    return array.sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  const sortedUsers = sortConfig.key
    ? sortArray([...users], sortConfig.key, sortConfig.direction)
    : users;

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
      key = null;
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th
              className={`sortable ${sortConfig.key === 'firstName' ? `sorted-${sortConfig.direction}` : ''}`}
              style={{ width: columnWidths.firstName }}
              onClick={() => handleSort('firstName')}
            >
              ФИО
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 'firstName')}></div>
            </th>
            <th
              className={`sortable ${sortConfig.key === 'lastName' ? `sorted-${sortConfig.direction}` : ''}`}
              style={{ width: columnWidths.lastName }}
              onClick={() => handleSort('lastName')}
            >
              Фамилия
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 'lastName')}></div>
            </th>
            <th
              className={`sortable ${sortConfig.key === 'age' ? `sorted-${sortConfig.direction}` : ''}`}
              style={{ width: columnWidths.age }}
              onClick={() => handleSort('age')}
            >
              Возраст
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 'age')}></div>
            </th>
            <th
              className={`sortable ${sortConfig.key === 'gender' ? `sorted-${sortConfig.direction}` : ''}`}
              style={{ width: columnWidths.gender }}
              onClick={() => handleSort('gender')}
            >
              Пол
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 'gender')}></div>
            </th>
            <th style={{ width: columnWidths.phone }}>
              Телефон
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 'phone')}></div>
            </th>
            <th
              className={`sortable ${sortConfig.key === 'address' ? `sorted-${sortConfig.direction}` : ''}`}
              style={{ width: columnWidths.address }}
              onClick={() => handleSort('address')}
            >
              Адрес
              <div className="resizer" onMouseDown={(e) => handleMouseDown(e, 'address')}></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.address.city}, {user.address.street}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
