import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Stream Relay Vibe</Link> 
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link> 
        </li>
        <li>
          <Link to="/login">Login</Link> 
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link> 
        </li>
        <li>
              <Link to="/friend-requests">Friend Requests</Link>
            </li>
        <li>
          <Link to="/posts">Posts</Link> 
        </li>  
        <li>
          <Link to="/notification" >Notofication</Link>
        </li>
        <li>
          <Link to="chat/:currentUser/:receiver">Messages</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
