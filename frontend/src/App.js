// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AccountDashboard from './components/AccountDashboard'; // Import your existing components
import TransactionHistory from './components/TransactionHistory';
import TransferFunds from './components/TransferFunds';
import AccountManagement from './components/AccountManagement';
import SearchTransactions from './components/SearchFeature';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<AccountDashboard />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/transfer" element={<TransferFunds />} />
            <Route path="/account" element={<AccountManagement />} />
            <Route path="/search" element={<SearchTransactions />} />
            
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
