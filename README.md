# <u>TP Noté VueJS</u>

## <u>Sommaire</u>

- [Sommaire](#sommaire)
- [Présentation](#présentation)
- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Exécution de l'application](#exécution-de-lapplication)
- [Équipe de développement](#équipe-de-développement)

## <u>Présentation</u>

Ce projet consiste à créer une application en Vue afin d'accéder à une API REST de questionnaires faites en flask.

## <u>Installation</u>

### Prérequis

- Python et pip (installation des requirement)
- [Node.js](https://nodejs.org/en)

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

- Il faut également installer vue via Node.js et installer les requirements pour flask :

    ```bash
    cd client_vue
    npm install vue@latest
    cd ..
    python -m venv env
    pip install -r requirements.txt
    ```

- Pour lancer l'api et le client :

    ```bash
    # client
    cd client_vue
    npm run dev

    # api
    source env/bin/activate # Linux
    # ou
    env/Script/activate # Windows
    cd server_rest
    flask initdb
    flask run
    ```

L'applicaion est maintenant accessible à l'adresse `http://localhost:5173`.

## <u>Équipe de développement</u>

- Arthur Villette ([GitHub](https://github.com/ArthurVillette))
- Valentin Romanet ([GitHub](https://github.com/ValRom28))