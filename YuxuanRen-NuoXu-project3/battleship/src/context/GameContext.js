import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react";
import { generateShips } from "../utils/ShipGenerator";
import { saveGameState, loadGameState } from "../utils/storage";

const GameContext = createContext();

const generateEmptyBoard = () =>
  Array(10).fill().map(() =>
    Array(10).fill().map(() => ({
      isShip: false,
      isHit: false,
      isRevealed: false
    }))
  );

const initialState = {
  playerBoard: generateEmptyBoard(),
  aiBoard: generateEmptyBoard(),
  gameMode: null,
  isGameOver: false,
  winner: null,
  currentPlayer: 'player',
};

const checkAllShipsSunk = (board) => {
  return board.every(row => row.every(cell => !cell.isShip || cell.isHit));
};

// Generate AI Targets
const generateAIAttack = (playerBoard) => {
  const availableCells = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (!playerBoard[x][y].isRevealed) {
        availableCells.push({ x, y });
      }
    }
  }
  return availableCells.length > 0 
    ? availableCells[Math.floor(Math.random() * availableCells.length)]
    : null;
};

// Game Status: Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME': {
      const playerBoard = generateShips(generateEmptyBoard());
      const aiBoard = generateShips(generateEmptyBoard());
      return {
        ...state,
        playerBoard,
        aiBoard,
        gameMode: action.payload.mode,
        isGameOver: false,
        winner: null,
        currentPlayer: 'player'
      };
    }
    case 'PLAYER_ATTACK': {
      const { x, y } = action.payload;
      const newAiBoard = state.aiBoard.map(row => [...row]);
      if (newAiBoard[x][y].isRevealed) return state;

      newAiBoard[x][y] = { ...newAiBoard[x][y], isRevealed: true, isHit: newAiBoard[x][y].isShip };
      const allAiShipsSunk = checkAllShipsSunk(newAiBoard);

      if (allAiShipsSunk) {
        return { ...state, aiBoard: newAiBoard, isGameOver: true, winner: 'Player' };
      }

      return {
        ...state,
        aiBoard: newAiBoard,
        currentPlayer: state.gameMode === 'easy' ? 'player' : 'AI'
      };
    }
    case 'AI_ATTACK': {
      if (state.gameMode === 'easy' || state.isGameOver) return state;

      const attack = generateAIAttack(state.playerBoard);
      if (!attack) return state;

      const { x, y } = attack;
      const newPlayerBoard = state.playerBoard.map(row => [...row]);

      newPlayerBoard[x][y] = { ...newPlayerBoard[x][y], isRevealed: true, isHit: newPlayerBoard[x][y].isShip };
      const allPlayerShipsSunk = checkAllShipsSunk(newPlayerBoard);

      if (allPlayerShipsSunk) {
        return { ...state, playerBoard: newPlayerBoard, isGameOver: true, winner: 'AI' };
      }

      return { ...state, playerBoard: newPlayerBoard, currentPlayer: 'player' };
    }
    case 'RESET_GAME': {
      return {
        ...initialState,
        playerBoard: generateShips(generateEmptyBoard()),
        aiBoard: generateShips(generateEmptyBoard()),
        gameMode: state.gameMode
      };
    }
    default:
      return state;
  }
};

// Provider Components
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const savedState = loadGameState();
    return savedState || initialState;
  });

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // 保存游戏状态到 localStorage
  useEffect(() => {
    if (!state.isGameOver) {
      saveGameState(state);
    }
  }, [state]);

  // Timer
  useEffect(() => {
    if (!state.isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [state.isGameOver]);

  const resetTimer = useCallback(() => {
    setTimer(0);
    setIsTimerRunning(true);
  }, []);

  useEffect(() => {
    setIsTimerRunning(!state.isGameOver);
  }, [state.isGameOver]);

  // AI Round
  useEffect(() => {
    if (state.currentPlayer === 'AI' && !state.isGameOver) {
      const aiTurnTimeout = setTimeout(() => {
        dispatch({ type: "AI_ATTACK" });
      }, 1000);
      return () => clearTimeout(aiTurnTimeout);
    }
  }, [state.currentPlayer, state.isGameOver, dispatch]);

  return (
    <GameContext.Provider value={{ state, dispatch, timer, resetTimer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);

