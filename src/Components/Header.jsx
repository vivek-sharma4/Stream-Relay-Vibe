import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // For navigation
  const isAuthenticated = localStorage.getItem('userId'); // Check if the user is logged in

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userId');
    alert('You have been logged out.');
    navigate('/'); // Redirect to Home page
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
          // Links for authenticated users
          <>
            {/* <Link to="/">Home</Link> */}
            <Link to="/profile">Profile</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/notifications">Notification</Link>
            <Link to="/Chatpage">Messages</Link>
            {/* <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button> */}
          </>
        ) : (
          // Links for unauthenticated users
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
