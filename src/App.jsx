import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Dashboard from "./userDashboard/Dashboard/Dashboard";
import SavedCharts from "./userDashboard/SavedCharts/SavedCharts";
import DataInputForm from "./userDashboard/DataInputForm/DataInputForm";
import ChartDisplay from "./userDashboard/ChartDisplay/ChartDisplay";
import DashboardHome from "./userDashboard/DashboardHome/DashboardHome";
import ChartDetails from "./userDashboard/ChartDetails/ChartDetails";

export default function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light'); 
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }

    // Hide navbar on all dashboard routes
    const showNavbar = !location.pathname.startsWith('/dashboard');


    return (
        <>
            {showNavbar && <Navbar toggleTheme={toggleTheme} theme={theme} />}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DataInputForm />} />
                    <Route path="saved-chart" element={<SavedCharts />} />
                    {/* <Route path="data-input" element={<DataInputForm />} /> */}
                    <Route path="chart-display" element={<ChartDisplay/>} />
                    <Route path="chart-details" element={<ChartDetails/>} />
                </Route>
            </Routes>
        </>
    );
}
