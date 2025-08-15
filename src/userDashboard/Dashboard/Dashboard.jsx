import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
    const { logout, user } = useContext(AuthContext); // use logout and user
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // clear user from context and localStorage
        navigate('/');  // redirect to landing page
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Welcome, {user?.email}</h2>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Home</Link></li>
                        <li><Link to="/dashboard/saved">Saved Charts</Link></li>
                        <li><Link to="/dashboard/profile">Profile</Link></li>
                        <li><Link to="/dashboard/settings">Settings</Link></li>
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
}
