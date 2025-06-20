import React, { useState, useEffect } from "react";
import Pages from "./components/Pages";
import BoardDetail from "./components/BoardDetail";
import "./App.css";

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const baseURL = "https://kudos-board-backend-zocu.onrender.com";
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(`${baseURL}/boards`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setBoards(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error loading boards:", err);
      });
  }, []);

  const addBoard = (board) => {
    fetch(`${baseURL}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(board),
    })
      .then((res) => res.json())
      .then((data) => setBoards((prev) => [data, ...prev]))
      .catch((err) => console.error("Error creating board:", err));
  };

  const deleteBoard = (id) => {
    fetch(`${baseURL}/boards/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBoards((prev) => prev.filter((b) => b.id !== id));
        if (selectedBoard?.id === id) setSelectedBoard(null);
      })
      .catch((err) => console.error("Error deleting board:", err));
  };

  const addCard = (boardId, card) => {
    const cardData = {
      boardId,
      title: card.title,
      description: card.description,
      gif: card.gif,
      author: card.author,
    };

    fetch(`${baseURL}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    })
      .then((res) => {
        return res.json();
      })
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
    fetch(`${baseURL}/cards/${id}/upvote`, {
      method: "PUT",
    })
      .then((res) => {
        return res.json();
      })
      .then((updatedCard) => {
        setBoards((prevBoards) =>
          prevBoards.map((board) => ({
            ...board,
            cards: board.cards.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            ),
          }))
        );

        if (selectedBoard) {
          setSelectedBoard((prevBoard) => ({
            ...prevBoard,
            cards: prevBoard.cards.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            ),
          }));
        }
      })
      .catch((err) => console.error("Error upvoting card:", err));
  };

  const deleteCard = (id) => {
    fetch(`${baseURL}/cards/${id}`, {
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

  const pinCard = (id, currentlyPinned) => {
    const action = currentlyPinned ? "unpin" : "pin";
    fetch(`${baseURL}/cards/${id}/${action}`, { method: "PUT" })
      .then((res) => {
        return res.json();
      })
      .then((updatedCard) => {
        setBoards((prev) =>
          prev.map((b) => ({
            ...b,
            cards: b.cards.map((c) =>
              c.id === updatedCard.id ? updatedCard : c
            ),
          }))
        );
        if (selectedBoard?.id) {
          setSelectedBoard((prev) => ({
            ...prev,
            cards: prev.cards.map((c) =>
              c.id === updatedCard.id ? updatedCard : c
            ),
          }));
        }
      })
      .catch((err) => console.error(err));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.className = newMode ? "dark" : "light";
    document.documentElement.className = newMode ? "dark" : "light";
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1>kudos board</h1>
        <button onClick={toggleDarkMode} className="darkmode-btn">
          {darkMode ? "☀️ light mode" : "🌙 dark mode"}
        </button>
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
          onPinCard={pinCard}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <footer>
        <p className="footer">valerie laju</p>
      </footer>
    </div>
  );
}

export default App;
