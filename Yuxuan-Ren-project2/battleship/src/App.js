import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/Game";  // 确保引入 GamePage
import Rules from "./pages/Rules";
import HighScores from "./pages/HighScores";
import { GameProvider } from "./context/GameContext";
import "./styles/common.css";
import "./styles/game.css";
import "./styles/index.css";
import "./styles/rules.css";
import "./styles/scores.css";

function App() {
  return (
    <GameProvider>
      <Router>
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">Battleship</h1>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/game/normal" className={({ isActive }) => (isActive ? "active" : "")}>
                  Game
                </NavLink>
              </li>
              <li>
                <NavLink to="/rules" className={({ isActive }) => (isActive ? "active" : "")}>
                  Rules
                </NavLink>
              </li>
              <li>
                <NavLink to="/highscores" className={({ isActive }) => (isActive ? "active" : "")}>
                  Scores
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:mode" element={<GamePage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/highscores" element={<HighScores />} />
          </Routes>
        </div>
        <footer>
          <p>&copy; 2025 Battleship. All rights reserved.</p>
        </footer>
      </Router>
    </GameProvider>
  );
}

export default App;