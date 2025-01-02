import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element: Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch login status from the backend
    axios
      .get('http://localhost:5000/is-logged-in')
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false); // Treat errors as not logged in
      });
  }, []);

  // Show a loading spinner while login status is being fetched
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    // Show an alert before redirecting
    if (!showAlert) {
      alert('You are not authorized to view this page. Redirecting to the login page.');
      setShowAlert(true); // Prevent multiple alerts
    }
    return <Navigate to="/" />;
  }

  // Render the component if logged in
  return Component;
};

export default PrivateRoute;
