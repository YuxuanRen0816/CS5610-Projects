import React, { useState } from "react";
import "../styles/game.css";

const SHIP_SIZES = [5, 4, 3, 3, 2];

const SetupBoard = ({ onSetupComplete }) => {
  const [board, setBoard] = useState(
    Array(10).fill(null).map(() => Array(10).fill(""))
  );
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);

  const canPlaceShip = (x, y, size, horizontal) => {
    if (horizontal) {
      if (y + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (board[x][y + i] !== "") return false;
      }
    } else {
      if (x + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (board[x + i][y] !== "") return false;
      }
    }
    return true;
  };

  const placeShip = (x, y) => {
    const size = SHIP_SIZES[currentShipIndex];
    if (!canPlaceShip(x, y, size, isHorizontal)) return;

    const newBoard = board.map((row) => [...row]);
    for (let i = 0; i < size; i++) {
      if (isHorizontal) newBoard[x][y + i] = "ship";
      else newBoard[x + i][y] = "ship";
    }

    setBoard(newBoard);
    if (currentShipIndex + 1 < SHIP_SIZES.length) {
      setCurrentShipIndex(currentShipIndex + 1);
    }
  };

  const handleCellClick = (x, y) => {
    if (currentShipIndex < SHIP_SIZES.length) {
      placeShip(x, y);
    }
  };

  const handleStart = () => {
    if (currentShipIndex === SHIP_SIZES.length) {
      onSetupComplete(board); // 通知父组件：准备完成
    } else {
      alert("Please place all ships first!");
    }
  };

  return (
    <div className="setup-container">
      <h3>Place your ships</h3>
      <button onClick={() => setIsHorizontal(!isHorizontal)}>
        Direction: {isHorizontal ? "Horizontal" : "Vertical"}
      </button>
      <div className="grid board-grid">
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`cell ${cell === "ship" ? "ship" : ""}`}
              onClick={() => handleCellClick(rowIdx, colIdx)}
            />
          ))
        )}
      </div>
      <button className="restart-btn" onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default SetupBoard;
