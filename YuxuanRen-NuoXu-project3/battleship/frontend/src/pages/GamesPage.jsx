import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const GamesPage = () => {
  const { user } = useAuth();
  const [games, setGames] = useState({});
  const [error, setError] = useState("");

  const fetchGames = async () => {
    try {
      const endpoint = user ? "/api/games/user" : "/api/games/public";
      const res = await axios.get(endpoint, { withCredentials: true });
      setGames(res.data);
    } catch (err) {
      setError("Failed to load games");
    }
  };

  useEffect(() => {
    fetchGames();
  }, [user]);

  const renderGames = (title, list) => (
    <div className="games-section">
      <h3>{title}</h3>
      {list?.length > 0 ? (
        <ul>
          {list.map((g) => (
            <li key={g._id}>
              <Link to={`/game/${g._id}`}>{g._id}</Link>
              {g.player1 && ` - ${g.player1}`} {g.player2 && ` vs ${g.player2}`} {g.winner && ` | Winner: ${g.winner}`}
              {g.status && ` | Status: ${g.status}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );

  return (
    <div className="games-page">
      <h2>All Games</h2>
      {error && <p className="error">{error}</p>}
      {user ? (
        <>
          {renderGames("Open Games", games.open)}
          {renderGames("My Open Games", games.myOpen)}
          {renderGames("My Active Games", games.myActive)}
          {renderGames("My Completed Games", games.myCompleted)}
          {renderGames("Other Games", games.other)}
        </>
      ) : (
        <>
          {renderGames("Active Games", games.active)}
          {renderGames("Completed Games", games.completed)}
        </>
      )}
    </div>
  );
};

export default GamesPage;
