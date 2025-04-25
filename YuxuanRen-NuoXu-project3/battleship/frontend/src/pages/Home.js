import React from "react";
import { Link } from "react-router-dom";
import "../styles/common.css";
import "../styles/index.css";

function Home() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h2>Welcome to Battleship Game</h2>
        <p>Choose Your Game Mode</p>
        <div>
          <Link to="/game/normal" className="play-btn">Play Normal</Link>
          <Link to="/game/easy" className="play-btn">Free Play Mode</Link>
        </div>
      </div>
    </header>
  );
}

export default Home;
