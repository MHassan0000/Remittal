<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Remittal project guidance

## Product and current scope

Remittal helps merchants reconcile courier COD payouts and track disputes to closure.
The source is `Remittal_CLI_Build_Brief.pdf`. Explicit user scope takes precedence over
the PDF's commands. Current milestone: lightweight initialization only. The homepage
is the Next.js starter; cloud integrations and the first vertical slice are not implemented.

Remittal reads evidence and does not hold or move customer funds. The first pilot targets
one store, two courier report formats and one bank export for a real period.
Planned flow: upload intent -> private S3 upload -> recorded evidence -> Trigger.dev
streaming import -> immutable source rows and normalized Postgres records -> deterministic
allocations/exceptions -> human review -> period close and evidence export.

The first functional milestone covers organization/store sign-in, CSV uploads, import
progress/errors, missing/short/duplicate/unknown payment classification, bank allocation,
timing differences, reviewer disputes and close exports. No part of this flow is operational yet.
Live courier/Shopify APIs, PDF/OCR, AI chat, labels, rider tracking, inventory, tax advice,
payments, lending and autonomous dispute submission are later scope. Add XLSX only when
real pilot samples justify it.

## Stack and organization

- Keep npm and `package-lock.json`; do not introduce another package manager.
- Preserve root `app/` and `@/*`. Add root `components/`, `server/`, `db/`, `trigger/`
  and `tests/` when their features exist; shared helpers live in `lib/`.
- Use App Router, strict TypeScript, Tailwind 4, initialized shadcn/ui (Base Nova,
  neutral tokens) and installed TanStack React Table. Add UI components as needed with
  `npx shadcn add <component>`. Configuration lives in `components.json`; global theme
  tokens and animation styles live in `app/globals.css`. Preserve system dark mode until
  an explicit theme toggle is implemented. No component screens are built yet.
  Read installed Next.js guides before framework changes.
- Approved future stack: Neon + Drizzle, Better Auth Organization plugin, private S3,
  Trigger.dev, csv-parse, Sentry, Vitest and Playwright.
  Install dependencies for concrete features, not speculative bulk setup.
- Keep matching reusable by routes and jobs; authorization, secrets and transactions
  belong server-side. Use `server-only` in Next.js server modules. Worker-shared
  domain modules must remain usable outside Next.js.
- Use `lib/utils.ts` for `cn()`. Add service-specific environment validation when the
  corresponding integration exists; absent future credentials must not block the starter.
- Keep `example.env` as the template with all nine environment keys from PDF page 3;
  Next.js loads its local copy `.env.local`. Add SDK-specific keys during integration.
- Future data records cover organizations/memberships/stores/courier accounts; uploads,
  source rows/mappings; orders/shipments/settlements/bank deposits/allocations/fee rules;
  reconciliation runs/exceptions/disputes/decisions/close periods/audit events. Define
  ownership and unique constraints when the schema is implemented.

## Financial and tenant invariants

- Use integer minor units (Postgres BIGINT) with ISO currency; never floating-point money.
  Define bigint serialization explicitly at JSON boundaries.
- Courier paid status is not bank receipt evidence. Keep expected, reported, received,
  unexplained and recoverable amounts distinct.
- Preserve immutable raw rows, source hashes/line identities, versioned calculation
  rules and reviewer decisions. Every conclusion must be reproducible.
- Imports are idempotent within tenant/file/source-row identity. Support many-to-many
  allocations, partial payments and later corrections rather than one mutable paid flag.
- Match explicit IDs/AWB first; uncertain matches require human review.
- Authorize every query, job and object access for tenant/store ownership and membership.
  Audit overrides, dispute decisions and final close.
- No silent AI money decisions. Real parsers and fees require redacted pilot samples;
  mark invented schemas and fixtures illustrative.

## UI and verification

Use accessible shadcn primitives as needed, clear hierarchy, aligned tabular amounts,
explicit currency, visible evidence and useful empty/loading/error states.
Product styling has not been selected. Do not present illustrative data as real balances.

Run `npm run lint`, `npm run typecheck` and `npm run build` for foundation changes.
Add focused Vitest money tests and Playwright workflows when those features exist.
Never commit credentials, customer data or agent session logs.

## Keep guidance current

When tasks change architecture, dependencies, environment, setup or milestones, update
the current state here and the relevant README instructions in the same task. Record
implemented facts and explicit decisions, removing stale guidance. Preserve the generated
Next.js block above. Maintenance happens during development tasks, not through an
unattended background updater.

The user will add project skills and custom agents themselves. Do not create or install
skills or agent definitions unless the user explicitly requests that change.
Empty `.agents/skills/` and `.codex/agents/` directories are reserved for their additions;
`.gitkeep` files preserve these directories in Git and contain no instructions.
Keep personal model, approval, trust and connector settings outside project scaffolding.
Separate architecture docs can be introduced when implementation becomes substantial;
for now maintain product context and decisions here, with setup in README.md.
