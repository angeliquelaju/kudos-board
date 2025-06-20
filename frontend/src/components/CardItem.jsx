import React from "react";


export default function CardItem({ card, onUpvote, onDelete, onPin }) {
  return (
    <div className={`card-item ${card.pinned ? "pinned" : ""}`}>
      <img src={card.gif} alt={card.title} />
      <h4>{card.title}</h4>
      <p>{card.description}</p>
      <p>{card.author}</p>
      <div className="cardButtons">
        <button className = "pin" onClick={() => onPin(card.id, card.pinned)}>
          {card.pinned ? "📌 unpin" : "📍 pin"}
        </button>
        <button onClick={() => onUpvote(card.id)} className = "upvote">👍 {card.votes}</button>
        <button onClick={() => onDelete(card.id)}>🗑</button>
      </div>
    </div>
  );
}
