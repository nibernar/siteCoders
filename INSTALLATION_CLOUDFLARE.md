Guide de Migration : CODERS vers Cloudflare Tunnel & Docker
===========================================================

Données du projet
-----------------

VPS IP : 168.231.82.224  
Domaines : codersai.org, codersai.net, codersai.fr  
Architecture cible : Cloudflare Tunnel (aucun port ouvert) + Docker (Front/Back/DB)

Étape 1 : Préparation des fichiers (sur votre ordinateur)
---------------------------------------------------------

Avant de toucher au serveur, préparer les 2 fichiers suivants dans le dossier projet local

### 1.1 Fichier .env (modifié)

Ajouter la variable pour le token du tunnel et modifier l’URL de l’API

Exemple de contenu du fichier `.env` :

```env
BACKEND_HOST=backend
BACKEND_PORT=8000
FRONTEND_PORT=3000

# MODIFICATION IMPORTANTE
# L'API sera accessible via le même domaine grâce au routage Cloudflare
VITE_API_URL=/api

# Token Cloudflare Tunnel (sera rempli à l'étape 2)
TUNNEL_TOKEN=

DB_HOST=database
DB_PORT=3306
DB_NAME=coders-db
DB_USER=coders-db-user
DB_PASSWORD=123
DB_ROOT_PASSWORD=123
LOG_LEVEL=debug
```

### 1.2 Fichier docker-compose.yml (version Tunnel)

```yaml
services:
  # Service Cloudflare Tunnel
  tunnel:
    image: cloudflare/cloudflared:latest
    container_name: coders-tunnel
    restart: unless-stopped
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    networks:
      - frontend-network
      - backend-network

  frontend:
    build:
      context: ./front
      dockerfile: Dockerfile
    container_name: coders-frontend
    networks:
      - frontend-network
    environment:
      - VITE_API_URL=${VITE_API_URL}
      - FRONTEND_PORT=${FRONTEND_PORT}
    # Pas de section "ports" : accessible uniquement via le tunnel
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:${FRONTEND_PORT}"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  backend:
    container_name: coders-backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    networks:
      - frontend-network
      - backend-network
    environment:
      - PORT=${BACKEND_PORT}
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
      - JWT_SECRET=${JWT_SECRET:-dev_jwt_secret_key}
    # Pas de section "ports"
    depends_on:
      database:
        condition: service_healthy
    restart: unless-stopped

  database:
    image: mysql:8.0
    container_name: coders-database
    networks:
      - backend-network
    volumes:
      - db_data:/var/lib/mysql
      - ./database/init:/docker-entrypoint-initdb.d
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      - MYSQL_DATABASE=${DB_NAME}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASSWORD}
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  db_data:
    name: coders-db-data

networks:
  frontend-network:
    name: coders-frontend-network
  backend-network:
    name: coders-backend-network
```

Étape 2 : Configuration du Tunnel (Cloudflare Zero Trust)
---------------------------------------------------------

Cette étape remplace la configuration DNS manuelle et la gestion des certificats.

### 2.1 Création du Tunnel

- Se connecter au dashboard Cloudflare Zero Trust : https://one.dash.cloudflare.com/.
- Aller dans Networks > Tunnels.
- Cliquer sur « Create a tunnel ».
- Choisir « Cloudflared (connector) ».
- Nommer le tunnel (par exemple : `vps-coders`) et sauvegarder.
- Dans « Install and run a connector », choisir Docker.
- Copier le token : c’est la longue chaîne qui suit `--token` dans la commande proposée.
- Action : coller ce token dans le fichier `.env` local, dans `TUNNEL_TOKEN`.

### 2.2 Routage du trafic (Public Hostnames)

Dans la configuration du tunnel, cliquer sur Next pour accéder à l’onglet « Public Hostnames ». Ajouter les règles suivantes.

Règle 1 : Site (Frontend)  
- Subdomain : www
- Domain : `codersai.org`  
- Path : (laisser vide)  
- Service : HTTP -> `coders-frontend:3000`  

Règle 2 : API (Backend)  
- Domain : `codersai.org`  
- Path : `api`  
- Service : HTTP -> `coders-backend:8000`  

Autres domaines (.net, .fr) : ajouter une règle « Frontend » pour chaque domaine supplémentaire (`codersai.net`, `codersai.fr`, etc.) pointant vers HTTP -> `coders-frontend:3000`.

Étape 3 : Migration sur le serveur (le jour J)
----------------------------------------------

Se connecter au VPS en SSH :

```bash
ssh root@168.231.82.224
```

### 3.1 Arrêt de l’ancien système (PM2)

Libérer les ressources et éviter les conflits, même si les ports publics ne sont plus utilisés.

```bash
pm2 stop all
pm2 delete all
pm2 kill
```

### 3.2 Transfert des fichiers

Depuis l’ordinateur local, envoyer le projet mis à jour (avec le bon token dans `.env`) vers le serveur :

```bash
scp -r /chemin/vers/votre/projet root@168.231.82.224:/root/siteCoders
```

### 3.3 Démarrage

Sur le serveur, se placer dans le dossier du projet et lancer Docker :

```bash
cd /root/siteCoders
docker-compose up -d --build
```

Docker télécharge l’image du tunnel, connecte le serveur à Cloudflare et lance le site.

Étape 4 : Validation
--------------------

- Vérifier dans Cloudflare Zero Trust que le tunnel est en statut HEALTHY (vert).
- Accéder à https://codersai.org : le cadenas SSL doit être présent (certificat géré par Cloudflare).
- Vérifier que le backend répond correctement en contrôlant que le site charge bien les données.