//homepage.jsx
import React, { useState } from 'react';
import { supabase } from '../client';

const Homepage = ({ token }) => {
  const [fullName, setFullName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userId = token.user.id;
      const { data, error } = await supabase
        .from('profile')
        .update({
          display_name: fullName,
        })
        .eq('id', userId);
  
      if (error) {
        throw error;
      }
  
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  }
  
  
  

  return (
    <div>
      <h2>Homepage</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for user's full name */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Homepage;
