import React from 'react';

const NoteForm = ({ onTitleChange, title, onContentChange, content }) => {
  return (
    <div className="note-form">
      <input type="text" placeholder="Titre de la note" value={title} onChange={onTitleChange} />
      <textarea placeholder="Contenu de la note en Markdown" value={content} onChange={onContentChange} />
    </div>
  );
};

export default NoteForm;