# Jobingo Frontend - Docker Dev/Prod Setup

## Development (Local)

### Start
```bash
docker-compose -f docker-compose.dev.yml up
```

### Configuration
- Edit `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

- Access:
  - Frontend: http://localhost:5173 (Vite dev server with auto-reload)
  - API: http://localhost:3000/api

### What happens
- Vite dev server with hot module reload
- `window.__CONFIG__.apiUrl` is read from `.env` via `import.meta.env.VITE_API_URL`
- Edit code and see changes instantly

---

## Production (VPS with Dockhand)

### Configuration
Create `.env.prod` or configure docker-compose:

```yaml
# docker-compose.prod.yml
frontend:
  environment:
    VITE_API_URL: https://api.yourdomain.com/api  # ← Change this!
```

### How it works
1. Docker image is built once: `ghcr.io/spitzerl/jobingo-frontend:latest`
2. At startup, `envsubst` replaces `$VITE_API_URL` in `public/config.json.template`
3. Creates `public/config.json` with the actual API URL
4. Frontend loads `config.json` on startup → `window.__CONFIG__ = { apiUrl: "..." }`
5. Nginx serves the compiled React app + config.json
6. **No rebuild needed** - just change the env var in docker-compose!

### Start
```bash
# On your VPS
docker-compose -f docker-compose.prod.yml up -d
```

**Dockhand automatically detects** new images on GHCR and redeploys.

---

## How API URL works

### Flow
1. **Dev**: `.env` → `import.meta.env.VITE_API_URL` → `src/api.js` → axios
2. **Prod**: `docker-compose` env var → `envsubst` → `public/config.json` → `window.__CONFIG__` → `src/api.js` → axios

### Fallback chain in `src/api.js`
```js
window.__CONFIG__.apiUrl            // Prod (from config.json)
|| import.meta.env.VITE_API_URL     // Dev (from Vite)
|| "http://localhost:3000/api"      // Fallback
```

### Runtime config in `index.html`
```js
fetch('./config.json')
  .then(r => r.json())
  .then(config => { window.__CONFIG__ = config; })
```

This file is created at container startup by `envsubst`.

---

## File Structure

```
public/
├── config.json.template    ← Template with $VITE_API_URL placeholder
└── ... (other static files)

dist/ (after build)
├── config.json             ← Generated at Docker startup from template
└── ... (compiled React)
```

---

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL
  - **Dev**: `http://localhost:3000/api`
  - **Prod**: `https://api.yourdomain.com/api`

### Backend (from `docker-compose.prod.yml`)
- `DATABASE_URL`: PostgreSQL connection
- `NODE_ENV`: `production`

### Database (from `docker-compose.prod.yml`)
- `POSTGRES_USER`: Postgres username (default: `postgres`)
- `POSTGRES_PASSWORD`: Postgres password
- `POSTGRES_DB`: Database name (default: `jobingo`)

---

## Images Used

- **Dev**: `node:20-alpine` (Vite dev server)
- **Prod**: Built locally then `ghcr.io/spitzerl/jobingo-frontend:latest`

## Next Steps

1. Build and push to GHCR:
   ```bash
   docker build -t ghcr.io/spitzerl/jobingo-frontend:latest .
   docker push ghcr.io/spitzerl/jobingo-frontend:latest
   ```

2. Configure Dockhand on your VPS to watch `ghcr.io/spitzerl/jobingo-frontend:latest`

3. Deploy with:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

---

## Troubleshooting

### Prod: API requests fail
- Check `VITE_API_URL` env var is set correctly
- Check browser console: `window.__CONFIG__` should show your config
- Check Network tab: `config.json` should be loaded
- Verify backend is accessible from VPS

### Dev: Changes not appearing
- Ensure you're using `docker-compose.dev.yml`
- Check Vite is running: http://localhost:5173

### Image not updating on Dockhand
- Verify image was pushed to GHCR
- Check Dockhand is monitoring the correct image name
- Manually trigger redeploy if needed

### Config.json not found in prod
- Verify `public/config.json.template` exists in repo
- Check Docker build logs: `docker build -t test . --no-cache`
- Verify file is copied: `docker run --rm test cat /usr/share/nginx/html/config.json`
