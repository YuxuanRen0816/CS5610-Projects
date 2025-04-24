export const generateShips = (board) => {
    const newBoard = board.map(row => [...row]);
    const shipSizes = [5, 4, 3, 3, 2];
  
    shipSizes.forEach(size => {
      let placed = false;
      while (!placed) {
        const vertical = Math.random() > 0.5;
        const x = vertical ? Math.floor(Math.random() * (10 - size)) : Math.floor(Math.random() * 10);
        const y = !vertical ? Math.floor(Math.random() * (10 - size)) : Math.floor(Math.random() * 10);
  
        if (canPlaceShip(newBoard, x, y, size, vertical)) {
          placeShip(newBoard, x, y, size, vertical);
          placed = true;
        }
      }
    });
  
    return newBoard;
  };
  
  const canPlaceShip = (board, x, y, size, vertical) => {
    for (let i = 0; i < size; i++) {
      const checkX = vertical ? x + i : x;
      const checkY = vertical ? y : y + i;
  
      if (checkX >= 10 || checkY >= 10 || board[checkX][checkY].isShip) return false;
  
      // 确保战舰周围不会有其他战舰
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const adjX = checkX + dx;
          const adjY = checkY + dy;
          if (adjX >= 0 && adjX < 10 && adjY >= 0 && adjY < 10) {
            if (board[adjX][adjY].isShip) return false;
          }
        }
      }
    }
    return true;
  };
  
  const placeShip = (board, x, y, size, vertical) => {
    for (let i = 0; i < size; i++) {
      const shipX = vertical ? x + i : x;
      const shipY = vertical ? y : y + i;
      board[shipX][shipY] = { ...board[shipX][shipY], isShip: true };
    }
  };
  