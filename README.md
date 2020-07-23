checkpoint 4

Pour utiliser le projet sur votre machine. 

Installation 

npm install pour installer tout les modules nécessaire pour le projet.

Créer la base de donnée circus sur votre machine.

Importer le fichier bbd.sql qui se trouve dans le dossier Ressources.

Créer un nouveau fichier .env a la racine du dossier Front et copier le contenu du fichier  .env.sample.

<!-- //REACT_APP_API_URL = http://localhost:8000// -->

Créer un nouveau fichier .env a la racine du dossier Back et copier le contenu du fichier  .env.sample et modifier les champs nécessaire comme indiquer (DB_USER, DB_ PASS, EMAIL, PASSWORD, RECIPIENT_EMAIL).

<!-- 
//DB_HOST=localhost
DB_PORT=3306
DB_USER=utilisateur mysql
DB_PASS=mot de passe utilisateur mysql
DB_NAME=circus
PORT=8000
CLIENT_APP_ORIGIN=http://localhost:3000
EMAIL=email configurer avec gmail (mettre la securité basse sur la boite mail)
PASSWORD=mot de passe boite mail
RECIPIENT_EMAIL=adress mail en copie  du mail// -->

Enfin pour avoir accès à la parti administrateur j'ai créer un utilisateur test pour pouvoir avoir accès.

Username: test
Mot de passe: test

Voila tout est prêt pour mettre en route le projet 


Ressource présente de le référentiel

Photo de wireframe du projet 
Photo de la modélisation de la base de donnée
Photo du descriptif de chaque table de la base de donnée
Base de donnée exporter un bdd.sql




