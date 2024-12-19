import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Make an API call to check the credentials
    axios.get(`http://localhost:3000/users?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          // Store the user ID in localStorage
          localStorage.setItem('userId', user.id); 
          alert('Login successful! Redirecting to profile...');
          navigate('/profile'); // Redirect to profile page
        } else {
          setErrors('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error.response?.data || error.message);
        setErrors('An error occurred during login.');
      });
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      {errors && <p className="error" style={{ color: 'red' }}>{errors}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
