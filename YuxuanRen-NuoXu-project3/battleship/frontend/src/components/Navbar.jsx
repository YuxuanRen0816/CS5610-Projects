// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleNewGame = async () => {
    try {
      const res = await axios.post("/api/games/new", {}, { withCredentials: true });
      const newGameId = res.data.gameId;
      navigate(`/game/${newGameId}`);
    } catch (err) {
      alert("Game creation failed");
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Battleship</h1>
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/games" className={({ isActive }) => isActive ? "active" : ""}>All Games</NavLink></li>
          <li><NavLink to="/high-scores" className={({ isActive }) => isActive ? "active" : ""}>Scores</NavLink></li>
          <li><NavLink to="/rules" className={({ isActive }) => isActive ? "active" : ""}>Rules</NavLink></li>
          {user ? (
            <>
              <li><button onClick={handleNewGame} className="new-game-btn">New Game</button></li>
              <li><span className="username">{user.username}</span></li>
              <li><button onClick={handleLogout} className="logout-btn">Sign Out</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink></li>
              <li><NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>Register</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
