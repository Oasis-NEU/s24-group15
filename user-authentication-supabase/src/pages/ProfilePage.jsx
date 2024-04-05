import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profileLink, setProfileLink] = useState('');
  const navigate = useNavigate(); 
  
  const location = useLocation(); 
  const userId = location.state.userId;

  function generateProfileURL() {
    const url = `${window.location.origin}/profile/${userId}`;
    setProfileLink(url);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(profileLink);
      alert('Profile link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy profile link: ', error);
      alert('Failed to copy profile link. Please try again.');
    }
  }

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', userId)
          .single();
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        console.error('No profile data found');
        return;
      }
      
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  }

  useEffect(() => {
    fetchProfile();
    generateProfileURL();
  }, [userId]);

  return (
    <div>
      <h2>User Information</h2>
      {userInfo && (
        <div>
          <p>Full Name: {userInfo.display_name}</p>
          <p>LinkedIn Link: {userInfo.linkedIn_link}</p>
          <p>University: {userInfo.university}</p>
          <p>Start Date: {userInfo.uni_start_date}</p>
          <p>End Date: {userInfo.uni_end_date}</p>
          <p>Major: {userInfo.major}</p>
          <p>GPA: {userInfo.gpa}</p>
          <p>Honors/Awards: {userInfo.honors_awards}</p>
          <p>Age: {userInfo.age}</p>
          <p>Experience: {userInfo.experience}</p>
          <p>Phone Number: {userInfo.phone_number}</p>
          <p>Activities: {userInfo.activities}</p>
          <p>Skills: {userInfo.skills}</p>
          <p>Projects: {userInfo.projects}</p>
        </div>
      )}
      <div>
        <p>Share your profile:</p>
        <input type="text" value={profileLink} readOnly />
        <button onClick={copyToClipboard}>Copy Link</button>
      </div>
      
      <button onClick={() => navigate('/homepage')}>Go to Homepage</button>
    </div>
  );
};

export default ProfilePage;
