import React from "react";

export default function CardItem({ card, onUpvote, onDelete }) {
  return (
    <div className="card-item">
      <img src={card.gif} alt={card.title} />
      <h4>{card.title}</h4>
      <p>{card.description}</p>
      <p>{card.author}</p>
      <div className = "cardButtons">
        <button onClick={() => onUpvote(card.id)}>👍 {card.votes}</button>
        <button onClick={() => onDelete(card.id)}>🗑</button>
      </div>
    </div>
  );
}
