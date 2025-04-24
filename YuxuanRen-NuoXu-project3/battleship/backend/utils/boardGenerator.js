// backend/utils/boardGenerator.js

function generateEmptyBoard() {
  return Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      ship: false,
      hit: false,
      miss: false,
    }))
  );
}
  
function canPlaceShip(board, x, y, length, horizontal) {
  if (horizontal) {
    if (y + length > 10) return false;
    for (let i = 0; i < length; i++) {
      if (board[x][y + i].ship) return false;
    }
  } else {
    if (x + length > 10) return false;
    for (let i = 0; i < length; i++) {
      if (board[x + i][y].ship) return false;
    }
  }
  return true;
}
  
function placeShip(board, x, y, length, horizontal) {
  for (let i = 0; i < length; i++) {
    if (horizontal) {
      board[x][y + i].ship = true;
    } else {
      board[x + i][y].ship = true;
    }
  }
}
  
function generateRandomBoard() {
  const board = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({ type: "empty", hit: false }))
  );

  const ships = [
    { name: "Carrier", size: 5 },
    { name: "Battleship", size: 4 },
    { name: "Cruiser", size: 3 },
    { name: "Submarine", size: 3 },
    { name: "Destroyer", size: 2 }
  ];

  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const dir = Math.random() < 0.5 ? "H" : "V";
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      let fits = true;

      for (let i = 0; i < ship.size; i++) {
        const r = dir === "H" ? row : row + i;
        const c = dir === "H" ? col + i : col;
        if (r >= 10 || c >= 10 || board[r][c].type !== "empty") {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < ship.size; i++) {
          const r = dir === "H" ? row : row + i;
          const c = dir === "H" ? col + i : col;
          board[r][c] = { type: ship.name, hit: false };
        }
        placed = true;
      }
    }
  }

  return board;
}

module.exports = generateRandomBoard;