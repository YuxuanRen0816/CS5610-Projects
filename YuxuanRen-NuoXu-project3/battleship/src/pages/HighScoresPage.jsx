import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";

const HighScoresPage = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");

  const fetchScores = async () => {
    try {
      const res = await axios.get("/api/scores", { withCredentials: true });
      setScores(res.data);
    } catch (err) {
      setError("Failed to load scores.");
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="highscores-page">
      <h2>High Scores</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(({ username, wins, losses }) => (
            <tr
              key={username}
              style={{ fontWeight: user?.username === username ? "bold" : "normal", color: user?.username === username ? "#2a9d8f" : "black" }}
            >
              <td>{username}</td>
              <td>{wins}</td>
              <td>{losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScoresPage;
