import React from 'react';

export default function CardItem({ card, onUpvote, onDelete }) {
  return (
    <div className="card-item">
      <h4>{card.title}</h4>
      <img src={card.gif} alt={card.title} />
      <p>{card.description}</p>
      <div className="card-footer">
        <span>{card.author || 'Anonymous'}</span>
        <div>
          <button onClick={() => onUpvote(card.id)}>👍 {card.votes}</button>
          <button onClick={() => onDelete(card.id)}>🗑</button>
        </div>
      </div>
    </div>
  );
}
