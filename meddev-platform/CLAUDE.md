# MedDev QMS Platform

## Project Overview
FDA/ISO 13485-compliant Quality Management System platform for medical device companies.
Built with Next.js 14, TypeScript, Tailwind CSS, Drizzle ORM, and PostgreSQL.

## Architecture
- **Framework**: Next.js 14 App Router
- **Database**: PostgreSQL with Drizzle ORM + postgres-js driver
- **Auth**: Clerk (multi-tenant with organization support)
- **AI**: Vercel AI SDK + OpenAI with token/cost tracking
- **Env Validation**: @t3-oss/env-nextjs
- **Styling**: Tailwind CSS with Radix UI primitives
- **Language**: TypeScript (strict mode)

## Key Directories
- `src/app/(dashboard)/` — Dashboard route group with shared layout
- `src/app/api/` — API routes (health, stats, webhooks)
- `src/components/layout/` — Sidebar, header, shared layout components
- `src/components/dashboard/` — Dashboard-specific widgets
- `src/server/db/schema/` — Drizzle ORM schema (13 files, all tenant-scoped)
- `src/server/services/` — Audit log, AI usage tracking
- `src/lib/` — Utilities
- `drizzle/` — SQL migrations (includes audit immutability trigger)

## Multi-Tenancy
- Every table has `tenant_id` column
- RLS policies enforce tenant isolation via `SET app.current_tenant_id`
- Clerk webhook auto-creates tenant on `organization.created`
- `withTenant()` helper in `src/server/db/index.ts`

## Regulatory Context
- **ISO 13485:2016** — QMS for Medical Devices
- **21 CFR Part 820** — FDA Quality System Regulation
- **ISO 14971** — Risk Management
- **EU MDR 2017/745** — Medical Device Regulation
- **21 CFR Part 11** — Electronic Records & Signatures (audit trail)

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run db:generate` — Generate Drizzle migrations
- `npm run db:push` — Push schema to database
- `npm run db:migrate` — Run Drizzle migrations
- `npm run db:studio` — Open Drizzle Studio
- `npm run db:seed` — Seed demo data
- `npm run typecheck` — TypeScript type checking

## Code Style
- Use TypeScript strict mode
- Prefer server components; use 'use client' only when needed
- All database queries go through Drizzle client in `src/server/db/index.ts`
- Always scope queries by tenant_id
- Track all AI usage with token counts and cost
