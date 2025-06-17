import React, { useState } from 'react';

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

export default function NewBoard({ addBoard }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'celebration',
    image: '',
    author: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');

  const handleLoadImage = () => {
    if (form.image === '') return alert('please enter a valid image URL');
    setPreviewUrl(form.image);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.image) return alert('image is required');
    addBoard({ ...form, id: generateId(), cards: [] });
    setForm({ title: '', description: '', category: 'celebration', image: '', author: '' });
    setPreviewUrl('');
    setOpen(false);
  };

  if (!open) return <button onClick={() => setOpen(true)}>+ create new board</button>;

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <form className="modal-board-form" onSubmit={submit}>
          <div className="form-left">
            <div className="upload-box">
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="preview-img" />
              ) : (
                <>
                  <div className="upload-icon"></div>
                  <p>image preview will appear here</p>
                </>
              )}
            </div>

            <input
              type="text"
              placeholder="paste image URL here"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              style={{ marginTop: '1rem', padding: '0.5rem', width: '100%', borderRadius: '10px', border: '1px solid #ccc' }}
            />
            <button type="button" className="url-btn" onClick={handleLoadImage}>
              load image
            </button>
          </div>

          <div className="form-right">
            <label htmlFor="title">title</label>
            <input
              type="text"
              className="input-field"
              placeholder="add a title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <label htmlFor="description">description</label>
            <textarea
              placeholder="add a detailed description"
              className="input-field"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <label htmlFor="author">author</label>
            <input
              type="text"
              placeholder="add an author"
              className="input-field"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <label htmlFor="category">category</label>
            <select
              className="input-field"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="celebration">celebration</option>
              <option value="thank you">thank you</option>
              <option value="inspiration">inspiration</option>
            </select>

            <div className="modal-buttons">
              <button type="submit">create board</button>
              <button type="button" onClick={() => setOpen(false)}>cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
