import React from 'react';

const NoteEditor = ({ selectedNote, onNoteChange, onSave }) => {
  return (
    <div className="note-editor">
      <h2>{selectedNote.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: selectedNote.htmlContent }} />
      <textarea value={selectedNote.markdownContent} onChange={onNoteChange} />
      <button onClick={onSave}>Sauvegarder</button>
    </div>
  );
};

export default NoteEditor;