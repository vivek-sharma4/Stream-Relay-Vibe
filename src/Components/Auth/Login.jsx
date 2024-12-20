import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components for Login page
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Full screen height */
  background: linear-gradient(to right, #0056b3, #0066cc); /* Blue gradient background */
  font-family: 'Arial', sans-serif;
`;

const LoginForm = styled.form`
  background: #66a7c8; /* Light blue background for the form */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 400px; /* Increased form width */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #333;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: 0.3s ease-in-out;

  &:focus {
    border-color: #0056b3; /* Blue border on focus */
  }
`;

const Button = styled.button`
  background-color: #0056b3; /* Blue button */
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #0066cc; /* Darker blue on hover */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Make an API call to check the credentials
    axios
      .get(`http://localhost:3000/users?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          // Store the user ID in localStorage
          localStorage.setItem('userId', user.id);
          
          // Set success message
          setSuccess('Login successfully');
          setTimeout(() => {
            navigate('/profile'); // Redirect to profile page
          }, 1000); // Delay redirect to show the success message
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
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login</Title>
        
        {/* Display success message if available */}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        {/* Display error message if any */}
        {errors && <ErrorMessage>{errors}</ErrorMessage>}
        
        {/* Email input */}
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Login;