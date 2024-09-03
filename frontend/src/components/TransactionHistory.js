// src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistory.css'

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = 4; // Example user ID
        const response = await axios.get(`http://127.0.0.1:5000/transactions/${userId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.date}: ₹{transaction.amount.toFixed(2)} ({transaction.type}) - {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
