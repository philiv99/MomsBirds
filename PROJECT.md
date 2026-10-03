# PROJECT.md — MomsBirds

Project-specific values for the "Mapping Mom's Life List" SPA. Shared agent rules
live in [AGENTS.md](AGENTS.md); this file holds the facts unique to this repo.
Never assume another repo shares these build, run, or deploy commands.

## Stack

- **Framework:** React 16.12 + Redux (`@reduxjs/toolkit`, `react-redux`).
- **Bundler:** webpack 4.43 with webpack-dev-server 3.11.
- **Node requirement:** `NODE_OPTIONS=--openssl-legacy-provider` is required for the
  React 16 / webpack 4 toolchain (set by the npm scripts).
- **Backend:** frontend only — all data comes from the shared InfoGoer REST API
  (`api.infogoer.com`). No database or server of its own.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server at `http://localhost:8080` (uses `src/devconfig.js`). |
| `npm run deploynoftp` | Production build only (`webpack.prod.js` → `dist/`). |
| `npm run deploy` | Production build **plus** FTP upload via `ftpdeploy.js` (production action). |

## API base URL switch

Selected at build time via the webpack `config` alias:

| Config module | Build | API base URL |
|---------------|-------|--------------|
| `src/devconfig.js` | `npm start` (dev) | `http://localhost:10152/api` |
| `src/prodconfig.js` | production build | `https://api.infogoer.com/api` |

These modules also carry **client-side** values (Mapbox token, wit.ai tokens). They are
public by design — a browser SPA compiles them into the bundle. Restrict them at the
provider and rotate if leaked; they are **not** server secrets.

## Deploy (production)

- Node `ftp-deploy` via `ftpdeploy.js` → host `ftp.infogoer.com`, remote
  `/explore.infogoer.com/wwwroot/momsbirds`.
- FTP credentials injected at deploy time from env `FTP_USER` / `FTP_PASSWORD`
  (git-ignored `.env` created from committed `.env.example`); `FTP_HOST` optional.
  `ftpdeploy.js` aborts if the credentials are unset. Never commit credentials.

## Database

No database of its own — reads/writes through the API. Schema, grants, and server-side
deployment live in the `api.infogoer.com` repo. Convenience npm scripts operate on the
shared `exploreinfogoer` MySQL database for local refreshes:

| Script | Purpose |
|--------|---------|
| `npm run dbbackupdev` | Dump the local dev database. |
| `npm run dbrestoredevtodev` | Restore the dev dump into the local database. |
| `npm run dbrestoredevtoprod` | **Destructive.** Restore the dev dump into production. |

These prompt for the MySQL password (`mysql -p`) and never embed it. Treat
`dbrestoredevtoprod` as a production action; back up first.

> The legacy `rose.arvixe.com` host referenced by these scripts must be verified/updated
> before use (tracked in Phase 7). The machine-specific `runapi` IIS Express path
> (`C:/Users/phili/...`) is also flagged to parameterize in Phase 7.

## Testing

Jest + `@testing-library/react` (jsdom). Run with `npm test` (`jest --ci --coverage`).
Babel gains `@babel/preset-env` only under the `test` env (see `.babelrc`), so the
webpack build is unchanged.

- **Config:** `jest.config.js` maps the webpack `config` alias to `src/devconfig.js`,
  stubs CSS/LESS and image imports, and mocks `mapbox-gl` (no WebGL under jsdom).
  `test/setupGlobals.js` exposes global `$`/`jQuery` (used by `windowdemensions.js`);
  `test/setupAfterEnv.js` loads `@testing-library/jest-dom`.
- **Layout:** unit tests in `src/__tests__/unit/` (action creators, the `content`
  reducer, the `birdLocation` middleware, and the `Footer` component); integration in
  `src/__tests__/integration/` (`birdLocationApi.test.js` exercises the API service
  boundary and asserts the `config` alias resolves the dev base URL
  `http://localhost:10152/api`).
- **API mocking:** the integration test stubs global `fetch` (hermetic, and verifies the
  exact resolved URL). `msw` was evaluated but has ESM/resolution friction under Jest 29;
  revisit it for browser-style connected-component mocking if needed.
- **Coverage baseline:** ~9% overall (redux actions/middleware and the `content` reducer
  are the covered paths). Raise this over time; the large UI component tree is untested.

```powershell
npm test                 # unit + integration with coverage
npx jest src/__tests__/unit   # unit only
```

## CI / verify

`verify.ps1` (repo root) is the single verification gate: `npm ci`, `npm test`, then the
production webpack build. The agent runs it locally before pushing;
`.github/workflows/spa-ci.yml` runs the same script on `ubuntu-latest` via PowerShell
Core for every pull request. PASS is the merge gate; CI does **not** deploy (no FTP).

```powershell
./verify.ps1              # full: install + test + build
./verify.ps1 -SkipInstall # local iteration when node_modules is present
```

## Related docs

- Workspace blueprint, architecture, and development environment plans live in the
  sibling `agentic` repo.
