import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import ToggleButton from '../LandingPageComponents/ToggleButton/ToggleButton';

const Navbar = ({ toggleTheme, theme }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Backdrop Overlay */}
            {menuOpen && <div className="backdrop" onClick={toggleMenu}></div>}

            <nav className='navbar-container'>
                {/* Logo */}
                <div className='nb-logo-wrapper'>
                    <h2 onClick={() => navigate('/')}>GSQ Graphics</h2>
                </div>

                {/* Desktop Menu */}
                <ul className='nb-menu-links'>
                    <li><a href="/features">Features</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/documentation">Documentation</a></li>
                </ul>

                {/* Desktop Buttons */}
                <div className='nb-btn'>
                    <button
                        className='signup-btn'
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </button>
                    <button
                        className='login-btn'
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </button>

                    {/* Theme Toggle Button */}
                    <ToggleButton
                        theme={theme}
                        toggleTheme={toggleTheme}
                    />
                </div>

                {/* Hamburger / Close Icon */}
                <div className='hamburger' onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="/features" onClick={toggleMenu}>Features</a></li>
                    <li><a href="/about" onClick={toggleMenu}>About</a></li>
                    <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
                    <li><a href="/Documentation" onClick={toggleMenu}>Documentation</a></li>
                </ul>

                {/* Theme Toggle in Mobile Menu */}
                <ToggleButton
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                <div className='mobile-btns'>
                    <button
                        className='signup-btn'
                        onClick={() => { navigate('/signup'); toggleMenu(); }}
                    >
                        Sign up
                    </button>
                    <button
                        className='login-btn'
                        onClick={() => { navigate('/login'); toggleMenu(); }}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
