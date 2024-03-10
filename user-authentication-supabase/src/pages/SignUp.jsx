// SignUp.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname_name: formData.fullName,
          }
        }
      });
      
      if (error) throw error;
      alert('Check your email for verification link');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <input
          className="signup-input"
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
        />
        <input
          className="signup-input"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="signup-input"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <button className="signup-submit" type="submit">Submit</button>
      </form>
      Already have an account? <Link className="login-link" to="/">Log In</Link>
    </div>
  );
};

export default SignUp;
