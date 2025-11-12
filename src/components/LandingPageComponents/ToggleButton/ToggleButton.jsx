import React from 'react'
import { FaMoon, FaSun } from "react-icons/fa";
import "./ToggleButton.css";

const ToggleButton = ({ theme, toggleTheme }) => {
    return (
        <div className='toggle-btn-container'>
            {/* Theme Toggle */}
            <button className="theme-toggle-btn" onClick={toggleTheme}>
                {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
        </div>
    )
}

export default ToggleButton