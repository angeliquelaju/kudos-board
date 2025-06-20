import React, { useState } from "react";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

export default function CreateCard({ boardId, addCard }) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    gif: "",
    author: "",
  });
  const [open, setOpen] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifs, setGifs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof addCard === "function") {
      addCard(boardId, {
        id: generateId(),
        title: form.title,
        description: form.message,
        gif: form.gif,
        author: form.author,
        votes: 0,
      });
      setForm({ title: "", message: "", gif: "", author: "" });
      setOpen(false);
    } else {
      console.error("addCard is not a function");
    }
  };

  const searchGifs = async () => {
    const apiKey = "EzkUsFXe7tiJUsRNEKnyNqJyxhSeiRmC";
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifSearch}&limit=5`
    );
    const { data } = await response.json();
    setGifs(data);
  };

  if (!open) {
    return <button onClick={() => setOpen(true)}>+ add card</button>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form className="modal-card-form" onSubmit={handleSubmit}>
          <h2>add card</h2>
          <label htmlFor="title">title</label>
          <input
            className="input-field"
            type="text"
            placeholder="add a title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />
          <label htmlFor="title">message</label>
          <input
            className="input-field"
            type="text"
            placeholder="add a message"
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            required
          />
          <label htmlFor="title">author</label>
          <input
            className="input-field"
            type="text"
            placeholder="add an author"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          />
          <label htmlFor="title">gif</label>
          <input
            className="input-field"
            type="text"
            placeholder="search GIFs"
            value={gifSearch}
            onChange={(e) => setGifSearch(e.target.value)}
          />
          <button className="url-btn" type="button" onClick={searchGifs}>
            search GIFs
          </button>

          <div className="gif-results">
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() =>
                  setForm((f) => ({ ...f, gif: gif.images.fixed_height.url }))
                }
                className={`gif-thumbnail ${
                  form.gif === gif.images.fixed_height.url ? "selected" : ""
                }`}
              />
            ))}
          </div>

          <div className="modal-buttons">
            <button type="submit">add</button>
            <button type="button" onClick={() => setOpen(false)}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}