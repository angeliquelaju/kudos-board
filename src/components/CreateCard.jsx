import React, { useState } from 'react';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

export default function CreateCard({ boardId, onAddCard }) {
  const [form, setForm] = useState({ title:'', description:'', gif:'', author:'' });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard(boardId, { ...form, id: generateId(), votes: 0 });
    setForm({ title:'', description:'', gif:'', author:'' });
    setOpen(false);
  };

  if (!open) {
    return <button onClick={() => setOpen(true)}>+ add card</button>;
  }

  return (
    <div className="modal">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h2>add card</h2>

        {['title','description','gif','author'].map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key.charAt(0) + key.slice(1)}
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            required={key !== 'author'}
          />
        ))}

        <div className="modal-buttons">
          <button type="submit">add</button>
          <button type="button" onClick={() => setOpen(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
}
