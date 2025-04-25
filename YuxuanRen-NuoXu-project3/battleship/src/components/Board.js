import React from "react";
import "../styles/game.css";

const Board = ({ board, isPlayer, onCellClick }) => {
  if (!board) return <div>Loading board...</div>; // 👈 防止 undefined 报错

  return (
    <div className="board-grid">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          let className = "cell";
          if (cell.isHit) className += " hit";
          if (cell.isMiss) className += " miss";
          if (isPlayer && cell.isShip) className += " ship";

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={className}
              onClick={() => onCellClick?.(rowIndex, colIndex)}
            >
              {cell.isHit ? "X" : cell.isMiss ? "•" : ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;


// import React from "react";
// import "../styles/game.css";

// const Board = ({ boardData, isPlayerView, onCellClick }) => {
//   const handleClick = (x, y) => {
//     if (onCellClick) {
//       onCellClick(x, y);
//     }
//   };

//   return (
//     <div className="board">
//       <div className="board-grid">
//         {boardData.map((row, rowIndex) =>
//           row.map((cell, colIndex) => {
//             const key = `${rowIndex}-${colIndex}`;
//             let className = "cell";

//             if (cell === "miss") className += " miss";
//             else if (cell === "hit") className += " hit";
//             else if (isPlayerView && cell === "ship") className += " ship";

//             return (
//               <div
//                 key={key}
//                 className={className}
//                 onClick={() => handleClick(rowIndex, colIndex)}
//               >
//                 {cell === "hit" ? "X" : cell === "miss" ? "•" : ""}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default Board;
