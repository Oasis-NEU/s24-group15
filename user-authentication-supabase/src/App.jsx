import React, {useState, useEffect} from 'react';
import {SignUp, LogIn, Homepage} from './pages';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(false);

  // Save token to sessionStorage when it changes
  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]); // Run this effect whenever 'token' changes

  // Retrieve token from sessionStorage on initial render
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []); // Run this effect once, on initial render

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LogIn setToken={setToken} />} />
        {token && <Route path="/homepage" element={<Homepage token={token} />} />}
      </Routes>
    </div>
  );
};

export default App;
