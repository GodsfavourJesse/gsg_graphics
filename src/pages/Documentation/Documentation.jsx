import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Settings,
    Puzzle,
    Wrench,
    Code2,
    Rocket,
    FolderTree,
    BookText,
    Lightbulb,
    Moon,
    Sun,
} from "lucide-react";
import "./Documentation.css";

const Documentation = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    return (
        <div className="documentation">
            <header className="doc-header">
                <div className="doc-navbar">
                    <div className="brand">
                        <BookOpen size={24} strokeWidth={2.3} />
                        <span>GSQ Graphics Docs</span>
                    </div>
                </div>
            </header>

            <div className="doc-content">
                <section className="doc-card">
                    <h2>
                        <Puzzle size={20} /> Overview
                    </h2>
                    <p>
                        The <strong>GSQ Graphics Charting System</strong> is a powerful web-based platform that enables users to easily create, customize, and visualize charts in real time. Designed with flexibility and performance in mind, it combines intuitive data input forms, modern visualization tools, and a responsive dashboard to deliver a seamless charting experience across all devices. 
                        <br /><br />
                        Users can generate various chart types such as bar, line, pie, and doughnut charts — all within seconds — while maintaining full control over their data. The system also provides user authentication for secure access, a light/dark theme toggle for comfort, and the ability to manage, save, and export generated charts for reports or presentations. 
                        <br /><br />
                        With its clean interface, data-driven architecture, and consistent user experience, GSQ Graphics simplifies the process of transforming raw data into meaningful visual insights, making it an ideal tool for students, developers, analysts, and businesses alike.
                    </p>

                </section>

                <section className="doc-card">
                    <h2>
                        <Settings size={20} /> Features
                    </h2>
                    <ul>
                        <li>User authentication (Signup & Login)</li>
                        <li>Modern and responsive dashboard layout</li>
                        <li>Real-time chart creation and visualization</li>
                        <li>Save and manage charts easily</li>
                        <li>Dark/Light theme toggle</li>
                        <li>Fully mobile responsive interface</li>
                    </ul>
                </section>

                <section className="doc-card">
                    <h2>
                        <Wrench size={20} /> Tech Stack
                    </h2>
                    <div className="tech-stack">
                        <span>
                            <Code2 size={16} /> React.js
                        </span>
                        <span>
                            <BookText size={16} /> React Router DOM
                        </span>
                        <span>🎨 CSS</span>
                        <span>☁️ Vercel (Hosting)</span>
                    </div>
                </section>

                <section className="doc-card">
                    <h2>
                        <Rocket size={20} /> Installation
                    </h2>
                <pre>
                    {`# Clone the repository
        git clone https://github.com/GodsfavourJesse/gsg_graphics

        # Move into the project directory
        cd gsq-graphics

        # Install dependencies
        npm install

        # Start the development server
        npm start`}
                </pre>
                </section>

                <section className="doc-card">
                    <h2>
                    <Rocket size={20} /> Deployment
                    </h2>
                    <p>
                        The project is deployed on <strong>Vercel</strong>. Every push to
                        the <code> main </code> branch triggers automatic deployment.
                    </p>
                    <p>Ensure you have a <code>vercel.json</code> file with this configuration:</p>
                <pre>
                    {`{
        "rewrites": [
            { "source": "/(.*)", "destination": "/" }
        ]
}`}
                </pre>
                </section>

                <section className="doc-card">
                    <h2>
                        <FolderTree size={20} /> Folder Structure
                    </h2>
                <pre>
                    {`src/
        ├── authentication/
        │   ├── Login.jsx
        │   └── Signup.jsx
        ├── components/
        │   ├── Navbar/
        │   └── Logout/
        ├── userDashboard/
        │   ├── Dashboard/
        │   ├── DashboardNavbar/
        │   ├── DataInputForm/
        │   ├── SavedCharts/
        │   ├── ChartDisplay/
        │   └── ChartDetails/
        ├── App.jsx
        └── index.js`}
                </pre>
                </section>

                <section className="doc-card">
                    <h2>
                        <BookText size={20} /> Usage Guide
                    </h2>
                    <ol>
                        <li>Sign up for an account and log in.</li>
                        <li>Access your dashboard for managing charts.</li>
                        <li>Create charts under the “Create Charts” section.</li>
                        <li>Export charts as PDF or image</li>
                        <li>Adjust your preferences in Settings.</li>
                    </ol>
                </section>

                <section className="doc-card">
                    <h2>
                        <Lightbulb size={20} /> Future Improvements
                    </h2>
                    <ul>
                        <li>Manage or view them under “Saved Charts”.</li>
                        <li>Cloud storage for charts and analytics</li>
                        <li>Collaborative team features</li>
                    </ul>
                </section>
            </div>

            <footer className="doc-footer">
                <p>
                Built with ❤️ by <strong>Schema World Technologies</strong>
                <br /> © {new Date().getFullYear()} All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Documentation;
