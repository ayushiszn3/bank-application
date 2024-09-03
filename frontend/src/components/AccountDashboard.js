import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaRegMoneyBillAlt, FaRegCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';
import './AccountDashboard.css';

const AccountDashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false); // State to track balance visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 4; // Example user ID
        const userResponse = await axios.get(`http://127.0.0.1:5000/users/${userId}`);
        setUser(userResponse.data);
        setBalance(userResponse.data.balance);

        const transactionsResponse = await axios.get(`http://127.0.0.1:5000/transactions/${userId}`);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      let updatedBalance = user.balance;

      transactions.forEach(transaction => {
        if (transaction.type === 'debit') {
          updatedBalance -= transaction.amount;
        } else if (transaction.type === 'credit') {
          updatedBalance += transaction.amount;
        }
      });

      setBalance(updatedBalance);
    }
  }, [transactions, user]);

  // Toggle balance visibility
  const toggleBalance = () => {
    setShowBalance(prevShowBalance => !prevShowBalance);
  };

  return (
    <div className="dashboard">
      <div className="account-info card">
        <h2>Account Overview</h2>
        {user && (
          <>
            <div className="account-holder">
              <FaUserCircle className="icon" />
              <div>
                <p>Account Holder</p>
                <h3>{user.name}</h3>
              </div>
            </div>
            <div className="account-details">
              <div className="account-detail">
                <FaRegCreditCard className="icon" />
                <div>
                  <p>Account Number</p>
                  <h3>{user.id}</h3>
                </div>
              </div>
              <div className="account-detail">
                <FaMoneyCheckAlt className="icon" />
                <div>
                  <p>Account Type</p>
                  <h3>Savings</h3> {/* Hardcoded as "Savings" */}
                </div>
              </div>
              <div className="account-detail">
                <FaRegMoneyBillAlt className="icon" />
                <div>
                  <p>Balance</p>
                  <h3 className="balance">
                    {showBalance ? `₹${balance.toFixed(2)}` : '****'}
                  </h3>
                </div>
              </div>
            </div>
            <button onClick={toggleBalance} className="toggle-button">
              {showBalance ? 'Hide Balance' : 'Show Balance'}
            </button>
          </>
        )}
      </div>
      <div className="transactions card">
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.slice(-3).map(transaction => (
            <li key={transaction.id} className="transaction-item">
              {/* <span>{transaction.date}</span> */}
              <span>{transaction.description}</span>
              <span className={`amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                ₹{transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountDashboard;
