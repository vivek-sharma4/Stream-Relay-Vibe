import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Stream Relay Vibe</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/notifications">Notification</Link>
        <Link to="/Chatpage">Messages</Link>
      </nav>
    </header>
  );
};

export default Header;
