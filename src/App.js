import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';
import SearchInput from './components/SearchInput';
import Modal from './components/Modal';
import Spinner from './components/Spinner';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError(`Error: ${err.response?.status || err.message}`);
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      try {
        const response = await axios.get('https://dummyjson.com/users/search', {
          params: {
            q: term,
          },
        });
        setUsers(response.data.users);
      } catch (err) {
        setError(`Error: ${err.response?.status || err.message}`);
      }
    } else {
      fetchUsers();
    }
  };
  
  
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <SearchInput onSearch={handleSearch} />
      <DataTable users={users} onRowClick={handleRowClick} />
      {selectedUser && <Modal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default App;
