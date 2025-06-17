import React from 'react';
import CreateCard from './CreateCard';
import CardItem from './CardItem';

export default function BoardDetail({ board, onBack, onAddCard, onUpvote, onDeleteCard }) {
  return (
    <div className="board-detail">
      <button onClick={onBack}>← back</button>
      <h2>{board.title}</h2>
      <p>{board.description}</p>
      <CreateCard boardId={board.id} onAddCard={onAddCard} />
      <div className="cards-grid">
        {board.cards.map(card => (
          <CardItem key={card.id} card={card} onUpvote={onUpvote} onDelete={() => onDeleteCard(card.id)} />
        ))}
      </div>
    </div>
  );
}
