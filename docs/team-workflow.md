# Team workflow

Suggested ownership for 3–4 developers: storefront/design; API/database; infrastructure/CI; optional QA/integration. Ownership helps coordination, but shared contracts and integration changes require review from both affected owners.

Use one repository and short feature branches such as `feat/homepage`, `feat/catalog-api`, or `infra/staging`. Open small pull requests with the problem, resulting behavior, checks actually run, and remaining limitations. Obtain at least one teammate review before merging. Do not change another person's uncommitted work.

Before implementation: read CLAUDE.md, inspect current modules, agree on shared contracts, and check project-status.md. After implementation: update status and durable decisions, run relevant checks, and describe what remains unverified. CI validates frontend code; it does not prove commerce, compliance, cloud deployment, or physical-device performance.

Use npm ci after pulling lockfile changes. Add dependencies in the intended workspace, e.g. `npm.cmd install <package> --workspace @vape-hub/web`. Commit package-lock.json with manifest changes. Never hand-edit lockfiles or commit node_modules.

Configure GitHub branch protection and required CI checks in the shared repository once created. This local project does not create a remote, push changes, or configure repository settings.
