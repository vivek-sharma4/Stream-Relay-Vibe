import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const isAuthenticated = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert('You have been logged out.');
    navigate('/'); 
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
            {/* <Link to="/">Home</Link> */}
            <Link to="/profile">Profile</Link>
            <Link to="/FriendRequests">Friend Request</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/notifications">Notification</Link>
            <Link to="/Chatpage">Messages</Link>
            {/* <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button> */}
          </>
        ) : (
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
