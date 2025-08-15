import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/300.css"; // Light
import "@fontsource/outfit/500.css"; // Medium
import "@fontsource/outfit/700.css"; // Bold

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);

