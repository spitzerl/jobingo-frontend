# Jobingo Frontend

Frontend React/Vite de l'application Jobingo.

## Installation en local (dev)

### Prérequis

- Node.js 20+
- npm

### Démarrage

```bash
npm ci
npm run dev
```

L'application est ensuite disponible sur l'URL affichée par Vite (par défaut `http://localhost:5173`).

### Démarrage avec Docker Compose (dev)

Le projet peut aussi être lancé en local dans un conteneur Node via `docker-compose.dev.yml`.

Prérequis :

- Docker compose
- Le fichier `.env` copié et configuré à partir de `.env.example`

```bash
docker compose -f docker-compose.dev.yml up
```

Le frontend est accessible sur `http://localhost:5173`.

Pour arrêter :

```bash
docker compose -f docker-compose.dev.yml down
```

## Scripts utiles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Génère le build de production dans `dist/` |
| `npm run preview` | Sert localement le build de production |
| `npm run lint` | Lance ESLint |

## Build Docker automatique (release)

Un workflow GitHub Actions publie automatiquement l'image Docker sur GHCR à chaque release GitHub publiée :

- Workflow : `.github/workflows/release-ghcr.yml`
- Trigger : `release` de type `published`
- Registry : `ghcr.io`
- Image : `ghcr.io/<owner>/<repo>` (nom du repo en minuscules)
- Tags publiés : tag de la release + `latest`

### Publier une nouvelle image

1. Créer une release GitHub (avec un tag, par ex. `v1.2.0`).
2. Le workflow build l'image avec le `Dockerfile` du repo.
3. L'image est poussée automatiquement sur GHCR avec les tags `v1.2.0` et `latest`.
