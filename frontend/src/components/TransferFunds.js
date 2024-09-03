import React, { useState } from 'react';
import axios from 'axios';
import styles from './TransferFunds.module.css'; // Import scoped CSS module

const TransferFunds = () => {
  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 4; // Example user ID
      await axios.post('http://127.0.0.1:5000/transactions', {
        amount,
        type: 'debit',
        description,
        user_id: userId,
      });

      // Clear the form
      setAmount('');
      setRecipientId('');
      setDescription('');
    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  };

  return (
    <div className={styles.transferFunds}>
      <h1 className={styles.heading}>Transfer Funds</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <label>
          Recipient ID:
          <input type="number" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit" className={styles.submitButton}>Transfer</button>
      </form>
    </div>
  );
};

export default TransferFunds;
