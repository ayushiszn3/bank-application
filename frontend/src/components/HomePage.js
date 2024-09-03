// src/components/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="logo" style={{ marginBottom: '0' }}>
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
      </div>
      <h1 style={{ marginTop: '0' }}>Welcome to JK-BANK</h1>
    </div>
  );
};

export default HomePage;
