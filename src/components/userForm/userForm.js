// components/UserForm.js

import { useState, useEffect } from 'react';

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch users on component mount
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/users/${id}` : '/api/users';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(isEditing ? 'User updated successfully!' : 'User added successfully!');
        setId('');
        setName('');
        setEmail('');
        setIsEditing(false);
        fetchUsers();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('User deleted successfully!');
        fetchUsers();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleEdit = (user) => {
    setId(user.id);
    setName(user.username);
    setEmail(user.email);
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Users</h1>
      {message && <p>{message}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} | {user.username} | ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="id" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="User ID"
        />
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name"
        />
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}
