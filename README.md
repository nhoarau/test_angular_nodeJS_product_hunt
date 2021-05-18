TEST
### Application React / Redux / Firebase

## Contexte

L'application devra comporter au moins deux pages, aucun système d'authentification n'est requis. L'UI de l'application ne vous est pas imposée, laissez parler votre créativité. Cependant ce n'est pas l'élément principal sur lequel vous serez jugé, privilégiez la qualité du code et la pertinence de vos choix techniques.

Pour la provenance des données, vous avez la possibiité d'utiliser la base de données Firebase fournie ou de mettre en place un autre système de base de données grâce aux fichiers .csv fournis ou d'utiliser directemment ces fichiers .csv.

## Etape lancement du projet sur environnement de dev

- Copie du projet en local: `git clone`
- Installation des packages: `npm i`
- Lancement du projet en local: `npm start`

## Contenu de l'application

2 pages:
- une première page contenant la totalité des équipements chargés à partir de la BDD firebase, ou à partir des csv fournis si la bdd ne renvoit rien. Cette page contient également un bloc filtre, qui permet de filtrer par noms d'équipements, domaine ou marque.
- une page de détail d'un équipement selectionné, qui contient les informations détaillées d'un équipement ainsi qu'un tableau récapitulatif des différents points de contrôle et défauts liés à cet équipement.

## Tips

Posibilité de tester l'outil avec les csv, en condition bdd indisponible, en ne chargeant pas les 2 tables utilisés:
-> commenter les lignes 15 à 17 du fichier `EquipementBoard.jsx` : 
 `useFirebaseConnect([
        'Equipments', 'Checkpoints' 
 ]);`
