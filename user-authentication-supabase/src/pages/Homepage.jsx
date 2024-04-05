import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import the CSS file

const Homepage = ({ token }) => {
  const [fullName, setFullName] = useState('');
  const [linkedInLink, setLinkedInLink] = useState('');
  const [university, setUniversity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGPA] = useState('');
  const [honors_awards, setHonAwr] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [activities, setActivities] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const userId = token.user.id;
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setFullName(data.display_name || '');
          setLinkedInLink(data.linkedIn_link || '');
          setUniversity(data.university || '');
          setStartDate(data.uni_start_date || '');
          setEndDate(data.uni_end_date || '');
          setMajor(data.major || '');
          setGPA(data.gpa || '');
          setHonAwr(data.honors_awards || '');
          setAge(data.age || '');
          setExperience(data.experience || '');
          setPhoneNumber(data.phone_number || '');
          setActivities(data.activities || '');
          setSkills(data.skills || '');
          setProjects(data.projects || '');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    }

    fetchProfileData();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userId = token.user.id;
      const { data, error } = await supabase
        .from('profile')
        .update({
          display_name: fullName,
          linkedIn_link: linkedInLink,
          university: university,
          uni_start_date: startDate,
          uni_end_date: endDate,
          major: major,
          gpa: gpa,
          honors_awards: honors_awards,
          age: age,
          experience: experience,
          phone_number: phone_number,
          activities: activities,
          skills: skills,
          projects: projects,
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      alert('Profile updated successfully!');
      console.log('Navigating to profile page...');
      navigate('/profile', {
        state: {
          userId: userId,
        },
      });
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  }

  return (
    <div className="container">
      <h2 style={{ color: '#4caf50' }}>Edit Profile</h2> {/* Green heading */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="url"
          name="linkedInLink"
          placeholder="LinkedIn Link"
          value={linkedInLink}
          onChange={(e) => setLinkedInLink(e.target.value)}
        />
        <input
          type="text"
          name="university"
          placeholder="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          name="endDate"
          placeholder="Graduation Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          name="major"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <input
          type="number"
          name="gpa"
          placeholder="GPA"
          value={gpa}
          onChange={(e) => setGPA(e.target.value)}
        />
        <input
          type="text"
          name="honors_awards"
          placeholder="Honors/Awards"
          value={honors_awards}
          onChange={(e) => setHonAwr(e.target.value)}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          name="activities"
          placeholder="Activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          type="text"
          name="projects"
          placeholder="Projects"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Homepage;
