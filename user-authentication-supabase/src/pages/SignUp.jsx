import React, { useState } from 'react'; // Importing React and useState hook
import { Link } from 'react-router-dom';
import { supabase } from '../client';
const SignUp = () => { // Declaring a functional component named App
  // State declaration: formData stores the form data, setFormData updates the form data
  const [formData, setFormData] = useState({
    fullName: '', // Initially empty full name
    email: '',    // Initially empty email
    password: ''  // Initially empty password
  });

  console.log(formData); // Logging the current form data to the console

  // Event handler for input changes
  function handleChange(event) {
    setFormData((prevFormData) => { // Updating form data based on previous state
      return {
        ...prevFormData,                  // Keeping previous form data
        [event.target.name]: event.target.value // Updating the changed field
      };
    });
  }

async function handleSubmit(e){
  e.preventDefault()
  try {
    const { data, error } = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname_name: formData.fullname,
          }
        }
      }
    )
    if (error) throw error  
    alert('Check your email for verification link')
    
  } catch (error) {
    alert(error)
  }

}

  return (
    <div>
      <form onSubmit={handleSubmit}> {/* Form for user input */}
        {/* Input field for full name */}
        <input 
          placeholder='Fullname' // Placeholder text for user guidance
          name='fullName'        // Unique identifier for the input field
          onChange={handleChange} // Event handler for input changes
        />

        {/* Input field for email */}
        <input 
          placeholder='Email'    // Placeholder text for user guidance
          name='email'           // Unique identifier for the input field
          onChange={handleChange} // Event handler for input changes
        />

        {/* Input field for password */}
        <input 
          placeholder='Password' // Placeholder text for user guidance
          name='password'        // Unique identifier for the input field
          type="password"
          onChange={handleChange} // Event handler for input changes
        />

        {/* Submit button */}
        <button type='submit'>Submit</button> {/* Button to submit the form */}
      </form>
      Already have an account? <Link to= '/'>LogIn</Link>
    </div>
  );
};

export default SignUp; // Exporting the App component as the default export
