# API boundary — not implemented

Future Express + TypeScript API backed by PostgreSQL. This directory is documentation only and is not an npm workspace yet.

When backend work starts, add `src/app.ts`, `src/server.ts`, `src/modules/<feature>` (routes, validation, service, repository), `src/middleware`, and `db/migrations`. Implement catalog first after requirements review. Keep authorization, prices, inventory transactions, and order transitions on the server. Publish platform-neutral contracts through `packages/contracts`.

Do not implement payment or pickup order contracts until the payment model, POS source of truth, and age-verification process are decided. Do not seed invented real inventory or credentials. Add API workspace scripts, tests, and separate environment examples when code exists.
