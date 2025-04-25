import React from "react";
import "../styles/rules.css";

function Rules() {
  return (
    <div className="rules-container">
      <h2>Game Rules</h2>
      <p>Battleship is a two-player strategy game where each player places their fleet of ships on a 10x10 grid and attempts to sink their opponent's ships.</p>
      <h3>How to Play:</h3>
      <ul>
        <li>Each player arranges five ships on their 10x10 grid.</li>
        <li>Players take turns guessing the location of their opponent’s ships.</li>
        <li>Hits are marked with a ✔️ and misses with a ❌.</li>
        <li>A ship is sunk when all its parts are hit.</li>
        <li>The winner is the first to sink all of their opponent’s ships.</li>
      </ul>
    </div>
  );
}

export default Rules;