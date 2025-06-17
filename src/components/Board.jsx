import React from "react";

export default function Board({ board, onClick, onDelete }) {
  return (
    <div className="board-card" onClick={onClick}>
      <img src={board.image} alt={board.title} />
      <div className="board-info">
        <h3>{board.title}</h3>
        <p>{board.author}</p>
      </div>
      <button
        className="deleteButton"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        delete
      </button>
    </div>
  );
}
