// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div>
          <h4>🚗 Second-Hand Vehicle Marketplace</h4>
          <p>Find the best deals on used cars, bikes, autos & more.</p>
        </div>

        <div>
          <h4>Contact Us</h4>
          <p>📞 +91 98765 43210</p>
          <p>📍 Hyderabad, Telangana, India</p>
          <p>✉️ support@vehiclemart.com</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <a href="/about">About</a><br />
          <a href="/blog">Blog</a><br />
          <a href="/login">Login</a><br />
          <a href="/register">Register</a>
        </div>
      </div>

      <p className="copyright">© {new Date().getFullYear()} VehicleMart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
