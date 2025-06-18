import React, { useState, useEffect } from "react";
import Pages from "./components/Pages";
import BoardDetail from "./components/BoardDetail";
import "./App.css";

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/boards")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch boards");
        return res.json();
      })
      .then((data) => setBoards(data.length ? data : [deafaultBoard]))
      .catch((err) => {
        console.error("Error loading boards:", err);
      });
  }, []);
  const addBoard = (board) => {
    fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(board),
    })
      .then((res) => res.json())
      .then((data) => setBoards((prev) => [data, ...prev]))
      .catch((err) => console.error("Error creating board:", err));
  };

  const deleteBoard = (id) => {
    fetch(`http://localhost:3000/boards/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBoards((prev) => prev.filter((b) => b.id !== id));
        if (selectedBoard?.id === id) setSelectedBoard(null);
      })
      .catch((err) => console.error("Error deleting board:", err));
  };

  const addCard = (boardId, card) => {
    fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...card, boardId }),
    })
      .then((res) => res.json())
      .then((newCard) => {
        setBoards((prev) =>
          prev.map((b) =>
            b.id === boardId ? { ...b, cards: [...b.cards, newCard] } : b
          )
        );
        if (selectedBoard?.id === boardId)
          setSelectedBoard((prev) => ({
            ...prev,
            cards: [...prev.cards, newCard],
          }));
      })
      .catch((err) => console.error("Error adding card:", err));
  };

  const upvoteCard = (id) => {
    const update = (cards) =>
      cards.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c));
    setBoards((prev) => prev.map((b) => ({ ...b, cards: update(b.cards) })));
    setSelectedBoard((prev) =>
      prev ? { ...prev, cards: update(prev.cards) } : prev
    );
  };

  const deleteCard = (id) => {
    fetch(`http://localhost:3000/cards/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const remove = (cards) => cards.filter((c) => c.id !== id);
        setBoards((prev) =>
          prev.map((b) => ({ ...b, cards: remove(b.cards) }))
        );
        setSelectedBoard((prev) =>
          prev ? { ...prev, cards: remove(prev.cards) } : prev
        );
      })
      .catch((err) => console.error("Error deleting card:", err));
  };

  return (
    <div className="App">
      <header>
        <h1>kudos board</h1>
      </header>

      {!selectedBoard ? (
        <>
          <Pages
            boards={boards}
            onSelect={setSelectedBoard}
            onDelete={deleteBoard}
            onAdd={addBoard}
          />
        </>
      ) : (
        <BoardDetail
          board={selectedBoard}
          onBack={() => setSelectedBoard(null)}
          onAddCard={addCard}
          onUpvote={upvoteCard}
          onDeleteCard={deleteCard}
        />
      )}

      <footer>
        <p className="footer">valerie laju</p>
      </footer>
    </div>
  );
}

export default App;

