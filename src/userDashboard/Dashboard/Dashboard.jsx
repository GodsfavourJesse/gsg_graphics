import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <DashboardNavbar />
            <main className="dashboard-content">
                {<Outlet />}
            </main>
        </div>
    );
}
