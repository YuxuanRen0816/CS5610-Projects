import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import Board from "../components/Board";

const GamePage = () => {
  const { gameId } = useParams();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGame = async () => {
    try {
      const res = await axios.get(`/api/games/${gameId}`, {
        withCredentials: true,
      });
      setGame(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch game failed:", err);
      setError("Failed to load game.");
    }
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  const handleFire = async (x, y) => {
    try {
      await axios.put(`/api/games/${gameId}/fire`, { x, y }, {
        withCredentials: true,
      });
      fetchGame(); // Refresh after move
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid move");
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (loading || !game) return <div>Loading game...</div>;

  const currentPlayer = user?.username;
  const isPlayer1 = game.player1 === currentPlayer;
  const isMyTurn = game.currentTurn === currentPlayer;

  const myBoard = isPlayer1 ? game.board1 : game.board2;
  const opponentBoard = isPlayer1 ? game.board2 : game.board1;

  const canPlay = user && game.status === "Active" && isMyTurn;

  return (
    <div className="game-container">
      <h2>Game ID: {gameId}</h2>
      <p>Status: {game.status}</p>
      {game.status === "Completed" && (
        <h3>{game.winner} Wins!</h3>
      )}
      {user && (
        <p>
          You are <strong>{currentPlayer}</strong>.{" "}
          {isMyTurn ? "Your turn!" : "Waiting for opponent..."}
        </p>
      )}

      <div className="boards">
        <div className="board-section">
          <h3>Opponent's Board</h3>
          <Board
            boardData={opponentBoard}
            isPlayerView={false}
            onCellClick={canPlay ? handleFire : null}
          />
        </div>
        <div className="board-section">
          <h3>Your Board</h3>
          <Board
            boardData={myBoard}
            isPlayerView={true}
            onCellClick={null}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
