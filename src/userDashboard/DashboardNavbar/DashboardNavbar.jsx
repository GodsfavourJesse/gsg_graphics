import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout/LogoutButton";
import "./DashboardNavbar.css";
import { BarChart3, Bookmark, LayoutDashboard, Settings } from "lucide-react";
import { FaBars } from "react-icons/fa";

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
                    <BarChart3 className="icon" />
                    {!collapsed && <span>Create Charts</span>}
                </NavLink>

                <NavLink 
                    to="/dashboard/saved-chart" 
                    className={({ isActive }) => 
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <Bookmark className="icon" />
                    {!collapsed && <span>Saved Charts</span>}
                </NavLink>

                <NavLink 
                    to="/dashboard/settings" 
                    className={({ isActive }) => 
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <Settings className="icon" />
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
