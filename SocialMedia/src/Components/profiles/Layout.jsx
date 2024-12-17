import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Navbar from '../Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
