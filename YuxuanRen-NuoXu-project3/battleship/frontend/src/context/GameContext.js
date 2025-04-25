// context/GameContext.js
import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  myBoard: Array(10).fill(null).map(() => Array(10).fill(null)),
  opponentBoard: Array(10).fill(null).map(() => Array(10).fill(null)),
  ships: [],
  phase: "placement", 
  currentTurn: null,
  gameId: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case "SET_GAME_ID":
      return { ...state, gameId: action.payload };
    case "SET_BOARD":
      return { ...state, myBoard: action.payload };
    case "SET_OPPONENT_BOARD":
      return { ...state, opponentBoard: action.payload };
    case "SET_SHIPS":
      return { ...state, ships: action.payload };
    case "SET_PHASE":
      return { ...state, phase: action.payload };
    case "SET_TURN":
      return { ...state, currentTurn: action.payload };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext();

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
