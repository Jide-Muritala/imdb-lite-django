import React from 'react';
import '../App.css';


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
