import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
    FaHome, 
    FaChartPie, 
    FaUser, 
    FaCog, 
    FaBars 
} from "react-icons/fa";
import LogoutButton from "../Logout/LogoutButton";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <h2 className="logo">{collapsed ? "GSQ" : "GSQ Graphics"}</h2>
                <button 
                    className="collapse-btn" 
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Sidebar Links */}
            <nav className="sidebar-links">
                <NavLink 
                    to="/dashboard"
                    end
                    className={({ isActive }) => 
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaHome className="icon" />
                    {!collapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink 
                    to="/dashboard/data-input" 
                    className={({ isActive }) => 
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaChartPie className="icon" />
                    {!collapsed && <span>Create Charts</span>}
                </NavLink>

                <NavLink 
                    to="/dashboard/saved-chart" 
                    className={({ isActive }) => 
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaUser className="icon" />
                    {!collapsed && <span>Saved Charts</span>}
                </NavLink>

                <NavLink 
                    to="/dashboard/settings" 
                    className={({ isActive }) => 
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <FaCog className="icon" />
                    {!collapsed && <span>Settings</span>}
                </NavLink>
            </nav>

            {/* Logout (Bottom) */}
            <div className="sidebar-footer">
                <LogoutButton collapsed={collapsed} />
            </div>
        </div>
    );
};

export default DashboardNavbar;
