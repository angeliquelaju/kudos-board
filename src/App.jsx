import React, { useState, useEffect } from "react";
import NewBoard from "./components/NewBoard";
import Pages from "./components/Pages";
import BoardDetail from "./components/BoardDetail";
import "./App.css";

const defaultBoard = {
  id: "welcome",
  title: "welcome",
  description: "sample",
  category: "inspiration",
  image: "https://i.pinimg.com/originals/a0/60/3d/a0603d56281458975b50f23247503d5e.jpg",
  author: "auto",
  cards: [],
};

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    setBoards([defaultBoard]);
  }, []);

  const addBoard = (board) => setBoards([board, ...boards]);
  const deleteBoard = (id) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
    if (selectedBoard?.id === id) setSelectedBoard(null);
  };

  const addCard = (boardId, card) => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId ? { ...b, cards: [...b.cards, card] } : b
      )
    );
    if (selectedBoard?.id === boardId)
      setSelectedBoard((prev) => ({ ...prev, cards: [...prev.cards, card] }));
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
    const remove = (cards) => cards.filter((c) => c.id !== id);
    setBoards((prev) => prev.map((b) => ({ ...b, cards: remove(b.cards) })));
    setSelectedBoard((prev) =>
      prev ? { ...prev, cards: remove(prev.cards) } : prev
    );
  };

  return (
    <div className="App">
      <header>
        <h1>kudos board</h1>
      </header>

      {!selectedBoard ? (
        <>
          <div className="dashboard-header">
            <NewBoard addBoard={addBoard} />
          </div>
          <Pages
            boards={boards}
            onSelect={setSelectedBoard}
            onDelete={deleteBoard}
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
