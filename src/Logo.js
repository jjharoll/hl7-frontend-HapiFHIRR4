// src/Logo.js
import React from 'react';

const Logo = ({ logo }) => {
  return (
    <div className="logo-container">
      <img src={logo} alt="HL7 Logo" />
    </div>
  );
};

export default Logo;
