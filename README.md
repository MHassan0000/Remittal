# Remittal

Courier COD payout reconciliation and dispute tracking for merchants and accountants.
Compare orders, courier settlements and bank receipts, retain evidence behind differences,
and track review through period close. Remittal does not hold or move funds.

This is a lightweight development foundation, not a working financial application.
The starter homepage remains. [AGENTS.md](AGENTS.md) contains product context,
the planned stack, financial rules and maintained development guidance.

## Local development

Use Node.js 20.9 or newer (compatible with installed Next.js) and npm.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. No service credentials are required for the starter.
When configuring a service, copy the template once and fill the relevant values:

```powershell
Copy-Item example.env .env.local
```

Do not overwrite an existing credentials file. `example.env` is the requested template
name; Next.js reads `.env.local`, not `example.env`. Real `.env*` files are ignored by Git.

## Installed foundation

The existing stack is Next.js App Router, React, strict TypeScript, Tailwind 4 and ESLint.
Small additions: Zod for validation, clsx + tailwind-merge for `cn()`,
class-variance-authority for variants, lucide-react for icons and server-only for
Next.js server boundary protection. New dependencies are pinned to exact versions.

shadcn/ui is initialized with `components.json`, neutral Base Nova theme tokens,
`shadcn/tailwind.css` and `tw-animate-css`. TanStack React Table is installed for future
financial grids. The `cn` package supports current shadcn-generated component imports;
the existing `lib/utils.ts` helper remains available. System dark mode is preserved.
Add only the components needed for a screen:

```powershell
npx shadcn add button
```

No components or financial grids have been implemented yet.
Neon/Drizzle, Better Auth, AWS SDKs, Trigger.dev, csv-parse, Sentry,
Vitest and Playwright are deferred until their features need them.

## Environment

| Key | Future use |
| --- | --- |
| `DATABASE_URL` | Neon Postgres TLS connection string |
| `BETTER_AUTH_SECRET` | Random secret of at least 32 characters |
| `BETTER_AUTH_URL` | Auth base URL, localhost for development |
| `AWS_REGION` | Private bucket region |
| `AWS_S3_BUCKET` | Environment-specific private bucket |
| `AWS_ACCESS_KEY_ID` | Restricted AWS signing identity |
| `AWS_SECRET_ACCESS_KEY` | Secret for that identity |
| `TRIGGER_SECRET_KEY` | Environment-specific job key |
| `SENTRY_DSN` | Optional local monitoring configuration |

All keys from PDF page 3 are included. Add extra SDK settings to the template and this
table as integrations require them. Never prefix service credentials with `NEXT_PUBLIC_`.
Use separate development, preview and production databases, buckets and credentials.

Environment validation will be implemented alongside each service integration. The
template alone does not configure or connect any services.

## Organization and verification

Keep root `app/` and the root `@/*` alias. Shared helpers live in `lib/`; introduce
`components/ui`, `server`, `db`, `trigger` and `tests` when implementations arrive.

```powershell
npm run lint
npm run typecheck
npm run build
```

Migration and domain/e2e test commands will be added when that tooling exists. Money
logic will use integer minor units, immutable evidence, tenant authorization and audited
review. Real parser formats and fees require redacted pilot samples; no customer fixtures
or fee rules have been invented.

The user manages project skills and custom agents. Reserved folders are `.agents/skills/`
and `.codex/agents/`; each contains only `.gitkeep` so Git preserves the empty folder.
No skills, custom agents or personal configuration are installed there.

`postcss.config.mjs` (Tailwind processing), `tsconfig.json` (TypeScript) and
`eslint.config.mjs` (lint rules) came from the original Next.js scaffold and are retained.
`lib/utils.ts` supplies the small `cn()` class-merging helper for future UI components.
Update AGENTS.md and this README when architecture, setup or project state changes.
