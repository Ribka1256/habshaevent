
import '../style/home.css';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFeaturedEvents } from '../api/events';
import { useAuth } from '../context/AuthContext';
import RequestModal from './RequestModal';
function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">HABESHA CEREMONIES</div>

      <nav className="navbar__links">
        <Link to="/home">🏠 Home</Link>
        <Link to="/eventlist">📅 Ceremonies</Link>
        <Link to="/dashboard">📖 Dashboard</Link>
        <Link to="/events/create">✉ Request Event</Link>
        <Link to="/profile">👤 Profile</Link>
      </nav>

      <div className="navbar__user">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button className="btn btn--logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn--login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default NavBar;