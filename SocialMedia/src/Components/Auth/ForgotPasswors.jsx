import React, { useState } from 'react';
import axios from 'axios';
// import './ForgotPassword.css';

const API_URL = "http://localhost:3000/users";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`${API_URL}?email=${email}`)
      .then((response) => {
        if (response.data.length > 0) {
          setMessage("Password reset email sent.");
        } else {
          setMessage("Email not found");
        }
      })
      .catch((error) => console.error("Error during password reset:", error));
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
