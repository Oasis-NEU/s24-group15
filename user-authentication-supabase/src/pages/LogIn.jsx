import React, { useState } from 'react'; // Importing React and useState hook
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './LogIn.css'; // Import the CSS file

const LogIn = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) throw error;
  
      // Pass the authentication data to the parent component
      setToken(data);
  
      // Navigate to the profile page directly after successful login
      navigate('/profile', {
        state: {
          userId: data.user.id 
        }
      });
    } catch (error) {
      alert(error.message);
    }
  }
  
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="login-input"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button className="login-submit" type="submit">Submit</button>
      </form>
      Don't have an account? <Link className="signup-link" to="/signup">Sign Up</Link>
    </div>
  );
};

export default LogIn;
