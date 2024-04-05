import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

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
        <div className="container">
            {userInfo && (
                <div className="user-info">
                    <h2><span className="styled-text big-name">{userInfo.display_name}</span></h2>
                    <p className="info-item subheading">Age: <span className="styled-text">{userInfo.age}</span></p>
                    <p className="info-item subheading">LinkedIn: <a href={userInfo.linkedIn_link} className="styled-text">{userInfo.linkedIn_link}</a></p>
                    <p className="info-item subheading">Phone Number: <span className="styled-text">{userInfo.phone_number}</span></p>

                    <div className="university-section">
                        <p className="info-item university"><span className="styled-text">{userInfo.university}</span> <span className="styled-text">(Start: {userInfo.uni_start_date}, End: {userInfo.uni_end_date})</span></p>
                        <p className="info-item"><span className="styled-text">{userInfo.major}</span></p>
                        <p className="info-item"><span className="styled-text">GPA: {userInfo.gpa}</span></p>
                        <p className="info-item"><span className="styled-text">Honors/Awards: {userInfo.honors_awards}</span></p>
                        <p className="info-item"><span className="styled-text">Activities: {userInfo.activities}</span></p>
                    </div>

                    <div className="section">
                        <h3 className="subheading">Experience</h3>
                        <p className="info-item"><span className="styled-text">{userInfo.experience}</span></p>
                    </div>

                    <div className="section">
                        <h3 className="subheading">Projects</h3>
                        <p className="info-item"><span className="styled-text">{userInfo.projects}</span></p>
                    </div>

                    <div className="section">
                        <h3 className="subheading">Skills</h3>
                        <p className="info-item"><span className="styled-text">{userInfo.skills}</span></p>
                    </div>
                </div>
            )}

            <div className="profile-link">
                <h3>Share your profile:</h3>
                <input type="text" value={profileLink} readOnly />
                <button className="copy-button" onClick={copyToClipboard}>Copy Link</button>
            </div>
            
            <button className="edit-button" onClick={() => navigate('/homepage')}>Edit Profile</button>
        </div>
    );
};

export default ProfilePage;
