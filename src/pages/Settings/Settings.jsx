import React from "react";
import "./Settings.css";
import DashboardToggle from "../../components/DashboardToggle/DashboardToggle";

const Settings = ({ theme, toggleTheme }) => {
    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <p className="settings-description">
                Customize your dashboard preferences and appearance.
            </p>

            <div className="settings-card">
                <DashboardToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </div>
    );
};

export default Settings;
