import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Showdown from 'showdown';

const converter = new Showdown.Converter(); //on initialise un objet converter pour la conversion Markdown -> HTML

//composant NoteDisplay avec les props title, markdownValue et onSave
function NoteDisplay({ title, markdownValue, onSave }) {
  //useState pour gérer l'état de l'édition de la note et du contenu édité Markdown
  const [editing, setEditing] = useState(false);
  const [editedMarkdown, setEditedMarkdown] = useState(markdownValue); //on initialise le contenu édité au contenu Markdown initial

  //pour activer le mode édition
  function handleEdit() {
    setEditing(true);
  }

  //pour sauvegarder les modifications
  function handleSave() {
    onSave(title, editedMarkdown); //appel de la fonction onSave avec titre et contenu édité
    setEditing(false); //on désactive le mode édition
  }

  return (
    <div>
      {/* si mode édition activé */}
      {editing ? (
        <div>
          {/* on affiche titre et textarea pour édition du contenu */}
          <h2>{title}</h2>
          <textarea
            value={editedMarkdown}
            onChange={(e) => setEditedMarkdown(e.target.value)}
            rows={10}
            cols={50}
          />
          {/* bouton pour sauvegarder les modifications */}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        //si mode édition désactivé
        <div>
          {/* on affiche titre et contenu Markdown converti en HTML */}
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(markdownValue) }} />
          {/* bouton pour activer mode édition */}
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

//on définit des propTypes pour les props du composant NoteDisplay
NoteDisplay.propTypes = {
  title: PropTypes.string.isRequired, //title doit être une chaîne de caractères requise
  markdownValue: PropTypes.string.isRequired, //markdownValue doit être une chaîne de caractères requise
  onSave: PropTypes.func.isRequired, //onSave doit être une fonction requise
};

export default NoteDisplay;




