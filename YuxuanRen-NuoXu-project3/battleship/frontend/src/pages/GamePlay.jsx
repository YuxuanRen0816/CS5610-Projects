import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import Board from "../components/Board";
import SetupBoard from "../components/SetupBoard"; 
import { useGameContext } from "../context/GameContext";

const GamePlay = () => {
  const { gameId } = useParams();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [setupDone, setSetupDone] = useState(false);
  const { state, dispatch } = useGameContext();

  const fetchGame = async () => {
    try {
      const res = await axios.get(`/api/games/${gameId}`, {
        withCredentials: true,
      });
      setGame(res.data);
      setLoading(false);
  
      const currentPlayer = user?.username;
      const isPlayer1 = res.data.player1 === currentPlayer;
      const board = isPlayer1 ? res.data.board1 : res.data.board2;
      const hasPlaced = board.some(row => row.includes("ship"));
      setSetupDone(hasPlaced);
    } catch (err) {
      setError("Failed to load game.");
      setLoading(false);
    }
  };

  const handleFire = async (x, y) => {
    if (!game || game.status !== "Active") return;
    if (game.currentTurn !== user?.username) {
      alert("It's not your turn!");
      return;
    }

    try {
      await axios.put(`/api/games/${gameId}/fire`, { x, y }, { withCredentials: true });
      await fetchGame(); 
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid move");
    }
  };

  const handleSetupComplete = async (placedBoard) => {
    try {
      await axios.put(`/api/games/${gameId}/place`, {
        board: placedBoard,
      }, {
        withCredentials: true,
      });
      setSetupDone(true);
      fetchGame(); // refresh game after placing ships
    } catch (err) {
      alert("Failed to save your board!");
    }
  };

  useEffect(() => {
    fetchGame();
    const interval = setInterval(fetchGame, 5000);
    return () => clearInterval(interval);
  }, [gameId]);

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

      {!setupDone ? (
        <SetupBoard onSetupComplete={handleSetupComplete} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default GamePlay;
