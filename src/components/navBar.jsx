import { useState, useRef, useEffect, use } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

import '../css/navbar.css'

function Navbar() {
    const { currentUser, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    async function handleLogout() {
        try {
            setDropdownOpen(false);
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">Marketplace</Link>
            </div>

            <form className="nav-search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className="nav-search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="nav-search-btn" aria-label="Search">
                    🔍
                </button>
            </form>

            <div className="nav-links">
                <Link to="/" className="nav-item">Home</Link>

                {currentUser ? (
                    <div className="user-dropdown-container" ref={dropdownRef}>
                        <button
                            type="button"
                            className="user-dropdown-btn"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        >
                            <span>Hello, {currentUser.displayName || currentUser.email.split('@')[0]}</span>
                            <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
                        </button>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                {/* Add more options here */}
                                <Link
                                    to="/orders"
                                    className="dropdown-item"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Order History
                                </Link>

                                <Link
                                    to="/profile"
                                    className="dropdown-item"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    My Profile
                                </Link>

                                <div className="dropdown-divider" />

                                <button
                                    type="button"
                                    className="dropdown-item logout-btn"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    //Guest
                    <div className="auth-buttons">
                        <Link to="/login" className="nav-btn">Log In</Link>
                        <Link to="/signup" className="nav-btn nav-btn-primary">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar