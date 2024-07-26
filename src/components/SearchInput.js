import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Поиск..."
    />
  );
};

export default SearchInput;
