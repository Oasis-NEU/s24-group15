import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
        try {
          const { data, error } = await supabase
            .from('profile')
            .select('*')
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
    }, []);
  

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
    </div>
  );
};

export default ProfilePage;