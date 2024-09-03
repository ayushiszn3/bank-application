import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AccountManagement.module.css'; // Import scoped CSS module

const AccountManagement = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(''); // New state for Date of Birth
  const [address, setAddress] = useState(''); // New state for Address
  const [zipcode, setZipcode] = useState(''); // New state for Zip Code
  const [branch, setBranch] = useState(''); // New state for Branch

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = 4; // Example user ID
        const response = await axios.get(`http://127.0.0.1:5000/users/${userId}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setDob(response.data.dob || ''); // Set DOB if available
        setAddress(response.data.address || ''); // Set Address if available
        setZipcode(response.data.zipcode || ''); // Set Zip Code if available
        setBranch(response.data.branch || ''); // Set Branch if available
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 4; // Example user ID
      await axios.put(`http://127.0.0.1:5000/users/${userId}`, { 
        name, 
        email, 
        dob, 
        address, 
        zipcode, 
        branch 
      });
      alert('Account updated successfully.');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <div className={styles.accountManagement}>
      <h1 className={styles.heading}>Account Management</h1>
      {user && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Date of Birth:
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </label>
          <label>
            Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label>
            Zip Code:
            <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          </label>
          <label>
            Branch:
            <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} />
          </label>
          <button type="submit" className={styles.submitButton}>Update</button>
        </form>
      )}
    </div>
  );
};

export default AccountManagement;
