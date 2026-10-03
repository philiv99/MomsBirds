# Mom's Birds

A React 16 single-page app ("Mapping Mom's Life List") that plots bird sightings on a
Mapbox map. It is a **frontend only** — all data comes from the shared InfoGoer REST API
(`api.infogoer.com`). The built site is published under the `explore.infogoer.com` site at
`/momsbirds`.

## Configuration

The app selects its API base URL at build time via a webpack alias:

| Config module | Used by | API base URL |
|---------------|---------|--------------|
| `src/devconfig.js` | `npm start` (dev) | `http://localhost:10152/api` |
| `src/prodconfig.js` | production build | `https://api.infogoer.com/api` |

These modules also carry **client-side** values (Mapbox token, wit.ai tokens). These are
**not** server secrets: a browser SPA compiles them into the public bundle by design.
Restrict them at the provider (URL-restrict the Mapbox token, scope the wit.ai apps) and
rotate them if leaked. **No database or FTP credentials are stored in this repo.**

## Build and run

```powershell
npm install
npm start            # dev server at http://localhost:8080 (uses devconfig.js)
npm run deploynoftp  # production build only (webpack.prod.js -> dist/)
npm run deploy       # production build + FTP upload (see below)
```

The build sets `NODE_OPTIONS=--openssl-legacy-provider` for the React 16 / webpack 4
toolchain.

## Deployment

`npm run deploy` builds `dist/` and uploads it with `ftpdeploy.js`
(Node `ftp-deploy`) to `ftp.infogoer.com` → `/explore.infogoer.com/wwwroot/momsbirds`.

FTP credentials are provided **at deploy time** through environment variables and are never
committed:

```powershell
# 1. Create your git-ignored env values from the template
Copy-Item .env.example .env        # then edit .env

# 2. Load them into the shell, then deploy
$env:FTP_USER = 'your-ftp-user'
$env:FTP_PASSWORD = 'your-ftp-password'
npm run deploy
```

`ftpdeploy.js` aborts if `FTP_USER`/`FTP_PASSWORD` are not set. `FTP_HOST` is optional and
defaults to `ftp.infogoer.com`.

## Database concerns

Mom's Birds has **no database of its own** — it reads and writes through the API. The
database schema, user grants, and server-side deployment live in the **`api.infogoer.com`**
repo (`setup_database.sql`, `grant_privileges.sql`).

This repo includes convenience npm scripts that operate directly on the shared
`exploreinfogoer` MySQL database for local data refreshes:

| Script | Purpose |
|--------|---------|
| `npm run dbbackupdev` | Dump the local dev database. |
| `npm run dbrestoredevtodev` | Restore the dev dump into the local database. |
| `npm run dbrestoredevtoprod` | **Destructive.** Restore the dev dump into production. |

These prompt for the MySQL password (`mysql -p`) and never embed it — keep it that way.
Treat `dbrestoredevtoprod` as a **production action** (back up first). The legacy
`rose.arvixe.com` host referenced by these scripts should be verified/updated before use.

## Security

- No FTP or database credentials are committed; deploy credentials are injected from the
  environment at deploy time (`.env` is git-ignored).
- Client-side tokens in `devconfig.js`/`prodconfig.js` are public by nature (shipped in the
  browser bundle); secure them by provider-side restriction and rotation, not by hiding.
