import React, { useState } from "react";
import { useGameContext } from "../context/GameContext";
import Board from "./Board";

const generateEmptyBoard = () => {
  return Array(10)
    .fill(null)
    .map(() =>
      Array(10)
        .fill(null)
        .map(() => ({
          isShip: false,
          isHit: false,
          isMiss: false,
        }))
    );
};

const SetupBoard = () => {
  const { state, dispatch } = useGameContext();
  const [tempBoard, setTempBoard] = useState(generateEmptyBoard());

  const placeShip = (x, y) => {
    const newBoard = tempBoard.map(row => [...row]);
    newBoard[x][y] = { ...newBoard[x][y], isShip: true };
    setTempBoard(newBoard);
  };

  const confirmPlacement = () => {
    dispatch({ type: "INITIALIZE_GAME", payload: { mode: "normal" } });
    dispatch({ type: "SETUP_COMPLETE" });
  };

  return (
    <div className="setup-container">
      <h2>Place Your Ships</h2>
      <Board isPlayer={true} board={tempBoard} onCellClick={placeShip} />
      <button onClick={confirmPlacement} disabled={!tempBoard.flat().some(cell => cell.isShip)}>
        Start Game
      </button>
    </div>
  );
};

export default SetupBoard;
