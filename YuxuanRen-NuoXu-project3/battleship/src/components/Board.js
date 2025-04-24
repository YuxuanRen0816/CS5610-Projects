import React from "react";
import { useGameContext } from "../context/GameContext";
import Cell from "./Cell";

const Board = ({ isPlayer, onCellClick, disabled }) => {
  const { state } = useGameContext();
  const board = isPlayer ? state.playerBoard : state.aiBoard;

  const handleCellClick = (x, y) => {
    if (disabled || board[x][y].isRevealed) return;
    if (onCellClick) {
      onCellClick(x, y);
    }
  };

  if (!board || board.length !== 10) {
    return <div>Loading board...</div>;
  }

  return (
    <div className="board">
      <div className="grid">
        {board.map((row, x) =>
          row.map((cell, y) => (
            <Cell key={`${x}-${y}`} cell={cell} isPlayer={isPlayer} onClick={() => handleCellClick(x, y)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
