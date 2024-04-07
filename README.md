# <u>TP Noté VueJS</u>

## <u>Sommaire</u>

- [Sommaire](#sommaire)
- [Présentation](#présentation)
- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Exécution de l'application](#exécution-de-lapplication)
- [Équipe de développement](#équipe-de-développement)

## <u>Présentation</u>

Ce projet consiste à créer une application en Javascript en interrogeant une API REST hébergée avec json-server.

## <u>Installation</u>

### Prérequis

- [Node.js](https://nodejs.org/en)
- json-server
- PHP

### Exécution de l'application

- Pour installer l'application, il suffit de cloner le dépôt git et de se placer dans le répertoire de l'application :

    ```bash
    git clone https://github.com/ValRom28/TP-JS-JV.git
    cd TP-JS-JV
    ```

- Si vous possédez une archive zip de l'application, il suffit de la décompresser et de se placer dans le répertoire de l'application :

    ```bash
    # Linux
    unzip TP-JS-JV.zip
    cd TP-JS-JV

    # Windows
    # Décompressez l'archive TP-JS-JV.zip
    cd TP-JS-JV
    ```

- Il faut également installer json-server via Node.js :

    ```bash
    npm install json-server
    ```

- Pour lancer l'api et le client :

    ```bash
    # client
    php -S localhost:5000

    # api
    npx json-server data.json
    ```

L'applicaion est maintenant accessible à l'adresse `http://localhost:5000`.

## <u>Équipe de développement</u>

- Arthur Villette ([GitHub](https://github.com/ArthurVillette))
- Valentin Romanet ([GitHub](https://github.com/ValRom28))