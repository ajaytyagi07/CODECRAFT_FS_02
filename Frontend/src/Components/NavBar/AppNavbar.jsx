import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppNavbar.css';

const AppNavbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/logout", {}, {
                withCredentials: true,
            });
            localStorage.removeItem("isAuthenticated");
            alert("Logged out");
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
            alert("Logout failed");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">CodeCraft</div>
            <div className="nav-links">
                <Link to="/user" className="nav-link">Employee Details</Link>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
                ) : (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default AppNavbar;
