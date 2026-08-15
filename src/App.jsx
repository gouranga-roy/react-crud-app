import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3001/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [editId, setEditId] = useState(null);

  // READ - সব ইউজার লোড করা
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error('ডাটা লোড করতে সমস্যা:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ফর্ম হ্যান্ডেল
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE বা UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      alert('সব ফিল্ড পূরণ করুন!');
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await axios.put(`${API_URL}/${editId}`, formData);
        setEditId(null);
      } else {
        // CREATE
        await axios.post(API_URL, formData);
      }

      setFormData({ name: '', email: '', age: '' });
      fetchUsers();
    } catch (error) {
      console.error('সেভ করতে সমস্যা:', error);
    }
  };

  // EDIT বাটন ক্লিক
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, age: user.age });
    setEditId(user.id);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত ডিলিট করতে চান?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('ডিলিট করতে সমস্যা:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>React Full CRUD System</h1>

      {/* Create / Update Form */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="নাম"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="ইমেইল"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="বয়স"
          value={formData.age}
          onChange={handleChange}
        />
        <button type="submit">
          {editId ? 'আপডেট করুন' : 'যোগ করুন'}
        </button>
        {editId && (
          <button type="button" onClick={() => {
            setEditId(null);
            setFormData({ name: '', email: '', age: '' });
          }}>
            ক্যানসেল
          </button>
        )}
      </form>

      {/* Read - টেবিল */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>নাম</th>
            <th>ইমেইল</th>
            <th>বয়স</th>
            <th>অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>এডিট</button>
                <button onClick={() => handleDelete(user.id)} className="delete">
                  ডিলিট
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
