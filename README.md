# The Vape Hub

A TypeScript monorepo for a real-client PERN + AWS storefront. This delivery implements the animated homepage and shared project foundation. Online sales, authentication, inventory, Express/PostgreSQL integration, and AWS deployment are not implemented.

## Start on Windows

1. Install Node.js 24 LTS. Open a PowerShell terminal.
2. Go to the project folder:
   ```powershell
   cd D:\ClientProjects\VapeHub
   ```
3. Install dependencies from the lockfile:
   ```powershell
   npm.cmd ci
   ```
4. Start the website in that same terminal:
   ```powershell
   npm.cmd run dev
   ```
5. Open the URL printed by Vite, normally http://127.0.0.1:5173. Keep this terminal running. Press Ctrl+C to stop it. If 5173 is occupied, use the different port Vite prints.

No database, Docker, AWS account, or environment variables are needed for the homepage. The source `.env.example` describes future public configuration; do not put secrets in `VITE_` variables.

## Checks

Open a second PowerShell terminal in the repository folder:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

Browser tests:

```powershell
npm.cmd exec --workspace @vape-hub/web -- playwright install --no-shell chromium
npm.cmd run test:e2e
```

The root browser-test command builds the frontend, then Playwright starts its own production preview on 127.0.0.1:4173. Do not run another application on that port during these checks.

Production build preview:

```powershell
npm.cmd run build
npm.cmd run preview
```

## What is included

- Homepage with three original 3D device concepts, explicit selection, coordinated colors/text, and scroll rotation.
- HTML content, poster fallback, reduced-motion support, mobile menu and single-device presentation.
- Category information, store directions, phone/email links, FAQ, and accurate future pickup messaging.
- npm workspaces, shared contracts, CI, tests, architecture and contributor guidance.

The temporary devices are not purchasable products. The store-sign graphic is original illustration, not a photograph of the premises. Replace concepts and branding with approved client assets before launch.

## Repository

`apps/web` contains the frontend. `packages/contracts` holds shared types. `apps/api` and `infra/aws` document the next implementation boundaries. Read [CLAUDE.md](CLAUDE.md) before contributing and [project status](docs/project-status.md) for validation and remaining work.
