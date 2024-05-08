import React, { useState } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';

function App() {
  // useState sert à gérer l'état des notes, d'une note sélectionnée,
  // l'état de création de note et du titre de la nouvelle note
  const [notes, setNotes] = useState(() => {
    //on initialise les notes à partir des données stockées localement
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNote, setSelectedNote] = useState(null); //on initialise la note sélectionnée à null
  const [isCreatingNote, setIsCreatingNote] = useState(false); //on initialise l'état de création de note à false
  const [newNoteTitle, setNewNoteTitle] = useState(''); //on initialise le titre de la nouvelle note comme vide

  //pour sauvegarder les notes dans le stockage local
  function saveNotesToLocalStorage(updatedNotes) {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  // pour ajouter une nouvelle note
  function addNote(newNoteContent) {
    if (!isCreatingNote) return; //on arrête la fonction si la création de note n'est pas active
    const newNote = {
      id: Date.now(),
      title: newNoteTitle || 'New note', //on utilise le titre saisi ou 'New note' par défaut
      content: newNoteContent || '' //on utilise le contenu saisi ou vide par défaut
    };
    const updatedNotes = [...notes, newNote]; //on ajoute la nouvelle note aux notes existantes
    setNotes(updatedNotes); //on met à jour l'état des notes
    saveNotesToLocalStorage(updatedNotes); //on sauvegarde les notes dans le stockage local
    setIsCreatingNote(false); //on désactive l'état de création de note
    setNewNoteTitle(''); //on réinitialise le titre de la nouvelle note
  }

  //pour supprimer une note
  function deleteNote(noteId) {
    const updatedNotes = notes.filter(note => note.id !== noteId); //on filtre les notes pour exclure celle à supprimer
    setNotes(updatedNotes); //on met à jour l'état des notes
    saveNotesToLocalStorage(updatedNotes); //on sauvegarde les notes dans le stockage local
    setSelectedNote(null); //on désélectionne la note
  }

  //pour mettre à jour une note
  function updateNote(updatedTitle, updatedContent) {
    const updatedNotes = notes.map(note =>
      //mise à jour de la note sélectionnée avec les nouveaux titre et contenu
      note.id === selectedNote.id ? { ...note, title: updatedTitle, content: updatedContent } : note
    );
    setNotes(updatedNotes); //mise à jour de l'état des notes
    saveNotesToLocalStorage(updatedNotes); //on sauvegarde les notes dans le stockage local
  }

  return (
    <>
      <h1 className="app-title">NOTEPAD</h1>
      <div className="app">
        <div className="sidebar">
          {/* bouton ajout nouvelle note */}
          <button className="add-note" onClick={() => setIsCreatingNote(true)}>Add Note</button>
          {/* liste notes existantes */}
          <div className="side-notes">
            {notes.map(note => (
              <div key={note.id} onClick={() => setSelectedNote(note)}>
                <h3 className="note-title">{note.title}</h3>
                <p>{note.content.slice(0, 15)}...</p>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className="main">
          {/* Si création d'une nouvelle note */}
          {isCreatingNote ? (
            <div>
              {/* input de titre */}
              <input
                type="text"
                placeholder="Title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              {/* composant MarkdownInput pour saisir le contenu */}
              <MarkdownInput addNote={addNote} />
            </div>
          ) : (
            // si note sélectionnée
            selectedNote && (
              <div>
                {/* input modification de titre */}
                <input
                  type="text"
                  placeholder="Title"
                  value={selectedNote.title}
                  onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                />
                {/* composant NoteDisplay pour afficher et éditer contenu */}
                <NoteDisplay
                  title={selectedNote.title}
                  markdownValue={selectedNote.content}
                  onSave={updateNote}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;



