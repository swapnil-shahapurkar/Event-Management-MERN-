import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './clear.css'; 

const Login = () => {
  const [error, setError] = useState(""); // State to manage error messages
  const navigate = useNavigate();
  
  
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
      const response = await fetch("http://localhost:5000/submit-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to /home on successful login
        alert("Login success")
        navigate("/home"); // Use React Router's navigate for navigation
      } else {
        // Show error message
        alert(result.message)
        setError(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "#0b0d19",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0b0d19",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "8px 8px 15px rgba(0, 0, 0, 0.2), -8px -8px 15px rgba(255, 255, 255, 0.1)",
          width: "350px",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "2.5em",
            marginBottom: "20px",
            color: "#8ac7ff",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <label
            htmlFor="email"
            style={{ fontWeight: "bold", color: "#8ac7ff" }}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email@example.com"
            required
            style={{
              width: "100%",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "16px",
            }}
          />
          <label
            htmlFor="password"
            style={{ fontWeight: "bold", color: "#8ac7ff" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            style={{
              width: "100%",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "rgba(58, 123, 213, 0.8)",
              color: "white",
              fontSize: "18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        {error && (
          <div
            id="error"
            style={{
              marginTop: "10px",
              color: "#ff7373",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
