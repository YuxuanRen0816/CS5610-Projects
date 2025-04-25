import React from "react";

const Cell = ({ cell, isPlayer, onClick }) => {
  let cellStyle = {};
  let content = "";

  if (!cell.isRevealed) {
    cellStyle = { backgroundColor: "#ddd", cursor: "pointer" };
  } else if (cell.isHit) {
    cellStyle = { backgroundColor: "#ff4444", cursor: "not-allowed" };
    content = "❌";
  } else {
    cellStyle = { backgroundColor: "#44ff44", cursor: "not-allowed" };
    content = "✅";
  }

  if (isPlayer && cell.isShip && !cell.isRevealed) {
    cellStyle.backgroundColor = "#666";
  }

  return (
    <div className="cell" style={cellStyle} onClick={onClick}>
      {content}
    </div>
  );
};

export default Cell;

//   if (type === "miss") {
//     cellClass += " miss";
//     content = "✅"; // Green check for misses
//   } else if (type === "hit") {
//     cellClass += " hit";
//     content = "❌"; // Red X for hits
//   } else if (type === "ship") {
//     cellClass += " ship";
//     content = "⚫"; // Black dot for ship (only visible for player)
//   }

//   return <div className={cellClass}>{content}</div>;
// }

// export default Cell;
