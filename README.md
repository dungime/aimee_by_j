<h1 align="center">aimee by j</h1>

<p align="center">
  Direct-to-consumer commerce store — Medusa v2 backend + Next.js storefront.
</p>

> **Project status.** This repository is **public as a case study**. The storefront
> UI was stripped back to its data layer and is being rebuilt from scratch on the
> stack described below. The backend (Medusa v2) is functional. Do not commit real
> secrets — see [`.env.template`](apps/backend/.env.template) files.

## Tech Stack

### Monorepo

| Concern | Choice | Notes |
|---|---|---|
| Package manager | **pnpm 8** (workspace) | single lockfile at the repo root |
| Task runner | **Turborepo** | `turbo dev` runs both apps; build/lint/typecheck cached in CI |
| Language | **TypeScript** (strict) | shared types between backend and storefront |
| Hosting | **Vercel** (storefront) · Medusa Cloud / container (backend) | |

### Backend — `apps/backend`

| Concern | Choice |
|---|---|
| Framework | **Medusa v2** (`2.17`) |
| Database | **PostgreSQL** |
| Cache / event bus (production) | **Redis** (`@medusajs/*-redis`) |
| File storage (production) | S3-compatible object storage |
| Custom code | Vietnamese payment providers, storefront cache-revalidation subscriber |

### Storefront — `apps/storefront`

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** — App Router | RSC/SSR for catalog & SEO pages |
| UI runtime | **React 19** | |
| Styling | **Tailwind CSS** (v4 planned) | zero-runtime, RSC-friendly |
| Components | **shadcn/ui** + **lucide-react** | copy-in components, owned in-repo |
| Server data | **React Server Components + Server Actions** | product/category/SEO pages |
| Client data | **TanStack Query v5** | cart, search, filters, account, checkout steps |
| API client | thin typed `medusaFetch()` wrapper (`@medusajs/types` for types) | |
| URL state | **nuqs** | sort / pagination / filters |
| Forms | **react-hook-form + zod** | shared validation schemas |
| Fonts / images | `next/font` · `next/image` | |

### Payments (Vietnam)

| Method | Status |
|---|---|
| Cash on Delivery | Medusa built-in manual provider (`pp_system_default`) |
| PayOS (VietQR bank transfer) | custom Medusa payment provider — planned |
| VNPay | custom Medusa payment provider — planned (production) |
| MoMo | custom Medusa payment provider — planned (production) |

### Architecture decisions

- **Single region (Vietnam).** No `[countryCode]` route segment; `region_id` is
  resolved by a helper. Region middleware is currently disabled.
- **i18n** via `next-intl` only if a second language is added — not region-based routing.

### Tooling

ESLint 9 (`eslint-config-next`) · Prettier · Playwright (e2e, optional) · GitHub Actions + Turborepo remote cache.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [PostgreSQL](https://www.postgresql.org/) v15+
- [pnpm](https://pnpm.io/) 8 (`corepack enable`)

### Local installation

1. Clone and install:

   ```bash
   git clone git@github.com:dungime/aimee_by_j.git
   cd aimee_by_j
   pnpm install
   ```

2. Backend environment:

   ```bash
   cp apps/backend/.env.template apps/backend/.env
   ```

   Set a real `DATABASE_URL` in `apps/backend/.env` (the database must exist):

   ```bash
   DATABASE_URL=postgres://postgres:@localhost:5432/medusa-backend
   ```

3. Run migrations and create an admin user:

   ```bash
   cd apps/backend
   pnpm exec medusa db:migrate
   pnpm exec medusa user -e admin@example.com -p supersecret
   ```

4. Start the backend, then open `http://localhost:9000/app`. Copy the publishable
   API key from **Settings → Publishable API keys**.

   ```bash
   pnpm dev            # from apps/backend
   ```

5. Storefront environment:

   ```bash
   cp apps/storefront/.env.template apps/storefront/.env.local
   ```

   Set the publishable key in `apps/storefront/.env.local`:

   ```bash
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
   ```

6. Start the storefront on `http://localhost:8000`:

   ```bash
   pnpm dev            # from apps/storefront
   ```

Or run both apps from the repo root:

```bash
pnpm dev
```

## Configuration

Storefront environment variables (`apps/storefront/.env.local`):

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Publishable API key from the Medusa backend | — |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Medusa backend URL | `http://localhost:9000` |
| `NEXT_PUBLIC_BASE_URL` | Storefront base URL | `http://localhost:8000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region country code | `vn` |

Backend variables are documented in [`apps/backend/.env.template`](apps/backend/.env.template).

## Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Next.js Documentation](https://nextjs.org/docs)
