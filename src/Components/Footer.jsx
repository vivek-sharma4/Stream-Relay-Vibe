// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>&copy; 2024 SocialApp. All rights reserved.</p>
//       <nav>
//         <a href="/about">About Us</a> | <a href="/contact">Contact</a> |{' '}
//         <a href="/privacy-policy">Privacy Policy</a>
//       </nav>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            Stream Relay Vibe is your ultimate platform for connecting, sharing, and discovering. 
            Join us to explore new possibilities!
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <strong>Email:</strong> viveksharma432002@gmail.com.com
            </li>
            <li>
              <strong>Phone:</strong> +91 9608300650
            </li>
            {/* <li>
              <strong>Address:</strong>  Stream Vibe Vizag, India
            </li> */}
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook">Facebook</i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      {/* <div className="footer-bottom">
        <p>© 2024 Stream Relay Vibe. All rights reserved.</p>
      </div> */}
    </footer>
  );
};

export default Footer;
