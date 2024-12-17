import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 SocialApp. All rights reserved.</p>
      <nav>
        <a href="/about">About Us</a> | <a href="/contact">Contact</a> |{' '}
        <a href="/privacy-policy">Privacy Policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
