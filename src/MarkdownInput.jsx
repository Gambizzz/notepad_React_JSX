import React, { useState } from 'react';
import PropTypes from 'prop-types';

//on définit le composant MarkdownInput avec les props addNote et updateNote
function MarkdownInput({ addNote, updateNote }) {
  //useState pour gérer l'état du contenu Markdown
  const [markdown, setMarkdown] = useState(() => {
    //on initialise contenu Markdown à partir des données stockées localement ou si données vides
    return localStorage.getItem('markdown') || '';
  });

  //pour gérer l'action de sauvegarde du contenu Markdown
  function handleSave() {
    addNote(markdown); //appel de la fonction addNote
    updateNote('', markdown); //appel de la fonction updateNote
    localStorage.setItem('markdown', markdown); //on stocke le contenu Markdown dans le stockage local
  }

  return (
    <div>
      {/* textarea pour contenu Markdown */}
      <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} rows={10} cols={50}/>
      {/* bouton sauvegarde du contenu */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

//on définit des propTypes pour les props du composant MarkdownInput
MarkdownInput.propTypes = {
  addNote: PropTypes.func.isRequired, //addNote doit être une fonction requise
  updateNote: PropTypes.func.isRequired, //updateNote doit être une fonction requise
};

export default MarkdownInput;

