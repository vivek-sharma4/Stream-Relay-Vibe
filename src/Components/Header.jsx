import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate(); 
  const isAuthenticated = localStorage.getItem('userId'); // Check if user is authenticated

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove the userId from local storage on logout
    alert('You have been logged out.');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="logo">
          <img src="/src/Components/logo.png" alt="Logo" className="logo-image" />
          <span>Stream Relay Vibe</span>
        </div>
      </Link>
      <nav>
        {isAuthenticated ? (
          <>
            {/* Authenticated user links */}
            <Link to="/profile">Profile</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/chatpage">Messages</Link>
            {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
          </>
        ) : (
          <>
            {/* Unauthenticated user links */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;