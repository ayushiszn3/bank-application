// src/components/SearchFeature.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchFeature.css';

const SearchFeature = () => {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = 4; // Example user ID
        const response = await axios.get(`http://127.0.0.1:5000/transactions/${userId}`);
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Initialize with all transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSearch = () => {
    const results = transactions.filter(transaction => {
      const matchesDescription = transaction.description.toLowerCase().includes(query.toLowerCase());
      const matchesAmount = amount ? transaction.amount === parseFloat(amount) : true;
      
      return matchesDescription && matchesAmount;
    });
    setFilteredTransactions(results);
  };

  return (
    <div className="search-feature">
      <h1>Search Transactions</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Search by amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {filteredTransactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.description}: ₹{transaction.amount.toFixed(2)} ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFeature;
