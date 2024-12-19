import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); 

  // const handleGoToProfile = () => {
  //   navigate('/profile'); 
  // };

  // const handleGoToPosts = () => {
  //   navigate('/posts');  // Navigate to the posts page
  // };

  const handleGoToLogin = () => {
    navigate('/login');  // Navigate to the login page
  };

  const handleGoToRegister = () => {
    navigate('/register');  // Navigate to the register page
  };

  return (
    <div className="home">
      <p>Your ultimate platform for connecting, sharing, and discovering new possibilities!</p>
      <div className="features">
        <div className="feature">
          <h3>Connect</h3>
          <p>Build lasting connections with friends, family, and colleagues.</p>
        </div>
        <div className="feature">
          <h3>Share</h3>
          <p>Share your thoughts, moments, and experiences with the world.</p>
        </div>
        <div className="feature">
          <h3>Discover</h3>
          <p>Explore new content, trends, and people from different parts of the world.</p>
        </div>
      </div>
      {/* <button onClick={handleGoToProfile} className="profile-btn">
        Go to Profile
      </button>
      <button onClick={handleGoToPosts} className="posts-btn">
        View Posts
      </button> Button to navigate to Posts */}
      <button onClick={handleGoToLogin} className="login-btn">
        Login
      </button> {/* Button to navigate to Login */}
      <button onClick={handleGoToRegister} className="register-btn">
        Register
      </button> {/* Button to navigate to Register */}
    </div>
  );
};

export default Home;
