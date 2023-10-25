import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NoteEditor from './NoteEditor';
import NoteForm from './NoteForm';
import showdown from 'showdown';
import './styles.css';

const converter = new showdown.Converter();

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', markdownContent: '' });

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const selectedNote = notes.find(note => note.id === selectedNoteId) || { title: '', markdownContent: '' };

  const handleNoteSelect = id => {
    setSelectedNoteId(id);
  };

  const handleNoteChange = event => {
    const updatedNote = { ...selectedNote, markdownContent: event.target.value };
    const htmlContent = converter.makeHtml(updatedNote.markdownContent);
    setSelectedNoteId(updatedNote.id);
    setNotes(prevNotes => prevNotes.map(note => (note.id === updatedNote.id ? { ...note, ...updatedNote, htmlContent } : note)));
  };

  const handleSaveNote = () => {
    const updatedNotes = notes.map(note =>
      note.id === selectedNote.id ? { ...note, ...selectedNote, htmlContent: converter.makeHtml(selectedNote.markdownContent) } : note
    );
    setNotes(updatedNotes);
  };

  const handleTitleChange = event => {
    setNewNote({ ...newNote, title: event.target.value });
  };

  const handleContentChange = event => {
    setNewNote({ ...newNote, markdownContent: event.target.value });
  };

  const handleCreateNote = () => {
    const id = Date.now().toString();
    const newNoteObj = { id, ...newNote, htmlContent: converter.makeHtml(newNote.markdownContent) };
    setNotes(prevNotes => [...prevNotes, newNoteObj]);
    setNewNote({ title: '', markdownContent: '' });
  };

  return (
    <div className="App">
      <Sidebar notes={notes} onNoteSelect={handleNoteSelect} />
      <NoteEditor selectedNote={selectedNote} onNoteChange={handleNoteChange} onSave={handleSaveNote} />
      <NoteForm
        onTitleChange={handleTitleChange}
        title={newNote.title}
        onContentChange={handleContentChange}
        content={newNote.markdownContent}
      />
      <button onClick={handleCreateNote}>Créer une nouvelle note</button>
    </div>
  );
};

export default App;