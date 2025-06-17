import React, { useState } from "react";
import Board from "./Board";
import { FaSearch } from "react-icons/fa"; 

export default function Pages({ boards, onSelect, onDelete }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = boards.filter(
    (b) =>
      (filter === "all" || b.category === filter) &&
      b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    "all",
    "recent",
    "celebration",
    "thank you",
    "inspiration",
  ];

  return (
    <>
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="board-grid">
        {filtered.map((board) => (
          <Board
            key={board.id}
            board={board}
            onClick={() => onSelect(board)}
            onDelete={() =>
              window.confirm("delete this board?") && onDelete(board.id)
            }
          />
        ))}
      </div>
    </>
  );
}
