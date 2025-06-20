import React from "react";
import CreateCard from "./CreateCard";
import CardItem from "./CardItem";

export default function BoardDetail({
  board,
  onBack,
  onAddCard,
  onUpvote,
  onDeleteCard,
  onPinCard,
  toggleDarkMode,
  darkMode,
}) {
  const sortedCards = [...board.cards].sort((a, b) => {
    if (a.pinned && b.pinned) {
      return new Date(b.pinnedAt || 0) - new Date(a.pinnedAt || 0);
    } else if (a.pinned) {
      return -1;
    } else if (b.pinned) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={`board-detail ${darkMode ? "dark" : "light"}`}>
      <button onClick={onBack}>← back</button>
      <h2>{board.title}</h2>
      <p>{board.description}</p>
      <CreateCard boardId={board.id} addCard={onAddCard} />
      <div className="cards-grid">
        {sortedCards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onUpvote={onUpvote}
            onDelete={() => onDeleteCard(card.id)}
            onPin={() => onPinCard(card.id, card.pinned)}
          />
        ))}
      </div>
    </div>
  );
}
