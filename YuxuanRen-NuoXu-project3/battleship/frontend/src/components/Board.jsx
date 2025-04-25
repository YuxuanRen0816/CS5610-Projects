import React from "react";
import "../styles/Board.css";

const Board = ({ boardData, onCellClick, isPlayerView }) => {
  return (
    <div className="board">
      {boardData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          let className = "cell";

          if (cell === "H") className += " hit";
          else if (cell === "M") className += " miss";
          else if (isPlayerView && cell === "S") className += " ship";

          const handleClick = () => {
            if (onCellClick) onCellClick(rowIndex, colIndex);
          };

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={className}
              onClick={handleClick}
              style={{ cursor: onCellClick ? "pointer" : "default" }}
            >
              {/* Optional: can show H/M text */}
              {cell === "H" && "💥"}
              {cell === "M" && "•"}
              {isPlayerView && cell === "S" && "🚢"}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;

// import React from "react";
// import "./styles/Board.css";

// const Board = ({ boardData, onCellClick, isPlayerView }) => {
//   return (
//     <div className={`board ${isPlayerView ? "player" : "opponent"}`}>
//       {boardData.map((row, y) => (
//         <div className="board-row" key={y}>
//           {row.map((cell, x) => {
//             const cellKey = `${x}-${y}`;
//             let className = "cell";

//             if (cell === "hit") className += " hit";
//             else if (cell === "miss") className += " miss";
//             else if (isPlayerView && cell === "ship") className += " ship";

//             return (
//               <div
//                 key={cellKey}
//                 className={className}
//                 onClick={() => {
//                   if (!isPlayerView && onCellClick) onCellClick(x, y);
//                 }}
//               />
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Board;
