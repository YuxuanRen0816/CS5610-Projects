import React, { useEffect } from "react";
import { useGameContext } from "../context/GameContext";
import { useParams } from "react-router-dom";
import Board from "../components/Board";

const Game = () => {
  const { mode } = useParams(); 
  const { state, dispatch, timer, resetTimer } = useGameContext();

  useEffect(() => {
    dispatch({ type: "INITIALIZE_GAME", payload: { mode } });
    resetTimer();
  }, [mode, dispatch, resetTimer]);

  const handleAttack = (x, y) => {
    if (state.currentPlayer === "player" && !state.isGameOver) {
      dispatch({
        type: "PLAYER_ATTACK",
        payload: { x, y },
      });
    }
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
    resetTimer();
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>{mode === "normal" ? "Standard Battle" : "Training Mode"}</h2>
        <div className="game-status">
          <span className="timer">Time: {timer}s</span>
          <span>Turn: {state.currentPlayer}</span>
          <button onClick={resetGame} className="reset-button">Reset</button>
        </div>
      </div>

      {state.isGameOver && (
        <div className="game-over">
          <h2>Game over! {state.winner} Won!</h2>
        </div>
      )}

      <div className="boards">
        {/* Enemy Board */}
        <div className="enemy-board">
          <h3>Enemy Waters</h3>
          <Board isPlayer={false} onCellClick={handleAttack} />
        </div>

        {/* Normal Mode */}
        {mode === "normal" && (
          <div className="player-board">
            <h3>Your Fleet</h3>
            <Board isPlayer={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;