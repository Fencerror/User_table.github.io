import React from 'react';

const TableHeader = ({ requestSort, sortConfig }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <thead>
      <tr>
        <th onClick={() => requestSort('firstName')} className={getClassNamesFor('firstName')}>
          ФИО
        </th>
        <th onClick={() => requestSort('age')} className={getClassNamesFor('age')}>
          Возраст
        </th>
        <th onClick={() => requestSort('gender')} className={getClassNamesFor('gender')}>
          Пол
        </th>
        <th onClick={() => requestSort('phone')} className={getClassNamesFor('phone')}>
          Номер телефона
        </th>
        <th onClick={() => requestSort('address')} className={getClassNamesFor('address')}>
          Адрес
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
