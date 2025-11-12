import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./DashboardToggle.css";

const DashboardToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="dashboard-toggle">
      <span className="toggle-label">Theme</span>
      <button className="toggle-switch" onClick={toggleTheme}>
        <div className={`switch-circle ${theme === "dark" ? "dark" : "light"}`}>
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </div>
      </button>
      <span className="toggle-mode-text">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
    </div>
  );
};

export default DashboardToggle;
