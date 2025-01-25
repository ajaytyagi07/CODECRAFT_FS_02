import React from 'react';
import './AppNavbar.css';

const AppNavbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-logo">CodeCraft</div>
            <ul className="navbar-links">
                <li><a href="/home">Home</a></li>
                <li><a href="/user">Employee Details</a></li>
                <li><a href="/register">Signup</a></li>
            </ul>
        </nav>
    );
};

export default AppNavbar;
