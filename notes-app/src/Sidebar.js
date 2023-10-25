import React from 'react';
import { handleCreateNote } from './App_2'; 

const Sidebar = ({ notes, onNoteSelect }) => {
  return (
    <div className="sidebar">
      <button onClick={handleCreateNote}>Nouvelle Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id} onClick={() => onNoteSelect(note.id)}>
            <strong>{note.title}</strong> - {note.content.substring(0, 15)}...
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;