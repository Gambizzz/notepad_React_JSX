# React + Vite


Ton objectif sera de créer un bloc-notes. Dans celui-ci, tu pourras écrire en markdown, et ton texte sera affiché en live sous forme de HTML.

L'ensemble des notes sera stocké dans le localStorage.

Ton application sera constituée de plusieurs parties.

Sur la gauche, l'utilisateur aura accès à une barre de navigation. Celle-ci contiendra la liste de tes notes. L'utilisateur pourra y voir un titre et le début du texte (~15 mots). L'utilisateur peut créer une nouvelle note en cliquant sur le bouton du haut.

À droite, prenant ~80% de la largeur, l'utilisateur verra le contenu de la note sélectionnée, bien mis en forme en HTML, dans la partie haute.
Dans la partie basse, un champ de texte (input) permettant de définir le nom de la note, ainsi qu'un autre champ (textarea) permettant de modifier le contenu de la note en markdown.

Pour transformer ton markdown en HTML, tu pourras utiliser la lib "showdown". Celle-ci te permet de transformer du markdown en HTML, et inversement. C'est grâce à cela que le markdown sera affiché en HTML et en live, sur la partie du dessus. En cliquant sur "save", l'utilisateur sauvegarde la note. C'est-à-dire que s'il recharge la page, sa note est toujours visible dans la liste à gauche. Il faudra donc sauvegarder les notes dans le localStorage.

L'utilisateur peut changer de note en cliquant sur l'une d'elles dans la liste à gauche. Il peut la modifier à sa guise.
