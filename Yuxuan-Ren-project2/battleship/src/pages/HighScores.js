import React from "react";
import "../styles/scores.css";

function HighScores() {
  return (
    <div className="scores-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Player1</td><td>15</td><td>5</td></tr>
          <tr><td>Player2</td><td>12</td><td>8</td></tr>
          <tr><td>Player3</td><td>10</td><td>10</td></tr>
          <tr><td>Player4</td><td>8</td><td>12</td></tr>
          <tr><td>Player5</td><td>5</td><td>15</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default HighScores;