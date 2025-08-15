import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                {/* About */}
                <div className="footer-about">
                    <h2>GSQ Graphics</h2>
                    <p>
                        Turn your data into beautiful, clear charts in seconds — 
                        perfect for presentations, reports, and sharing insights.
                    </p>
                </div>

                {/* Product */}
                <div className="footer-links">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="#features-section">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div className="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                {/* Social */}
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaGithub /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} GSQ Graphics. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
