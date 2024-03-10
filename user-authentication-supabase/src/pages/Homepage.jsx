// Homepage.jsx

import React from 'react';
import './Homepage.css';

const Homepage = ({ token }) => {
  return (
    <div className="homepage-container">
      Welcome back, {token.user.user_metadata.full_name}
    </div>
  );
};

export default Homepage;
