import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Use axios.post to send data to the server
      const response = await axios.post('http://localhost:5000/submit-signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response from the server
      if (response.ok) {
        navigate('/'); // Redirect to login page on success
      } else {
        setError(response.data.message || 'Sign-up failed.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div
      style={{
        background: '#0b0d19',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#0b0d19',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.2), -8px -8px 15px rgba(255, 255, 255, 0.1)',
          width: '350px',
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontSize: '2.5em',
            marginBottom: '20px',
            color: '#8ac7ff',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              fontWeight: 'bold',
              color: '#8ac7ff',
            }}
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            style={{
              width: '100%',
              padding: '15px',
              margin: '15px 0',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.1)',
            }}
          />

          <label
            style={{
              fontWeight: 'bold',
              color: '#8ac7ff',
            }}
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '15px',
              margin: '15px 0',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.1)',
            }}
          />

          <label
            style={{
              fontWeight: 'bold',
              color: '#8ac7ff',
            }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '15px',
              margin: '15px 0',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.1)',
            }}
          />

          <label
            style={{
              fontWeight: 'bold',
              color: '#8ac7ff',
            }}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword" // Updated name to match formData
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            style={{
              width: '100%',
              padding: '15px',
              margin: '15px 0',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.1)',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: 'rgba(58, 123, 213, 0.8)',
              color: 'white',
              fontSize: '18px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s',
              marginTop: '10px',
            }}
          >
            Sign Up
          </button>
        </form>

        {error && (
          <div
            style={{
              color: '#ff7373',
              fontSize: '14px',
              textAlign: 'center',
              marginTop: '10px',
            }}
           >
            {error}
          </div>
        )}

        <p
          style={{
            marginTop: '15px',
            fontSize: '14px',
            color: '#555',
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}
          <a
            href="/"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
