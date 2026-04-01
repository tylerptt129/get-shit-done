# Claude Code Execution Instructions — MedDev Automation QMS Platform

**Version:** 1.0
**Last updated:** 2026-03-31
**Status:** APPROVED — Execute in order

> These instructions tell Claude Code EXACTLY what to build, in what order, with what commands. Follow them sequentially. Each section is a self-contained execution unit.

---

## How to Use This Document

1. **READ `00-CRITICAL-FIXES.md` FIRST** — Contains 9 fixes from expert review that override specific code in steps 01–09
2. Execute sections in order (01 → 02 → 03 → etc.)
3. Each section has: **WHAT** to build, **EXACT COMMANDS** to run, **FILES** to create, and **VERIFICATION** steps
4. When a step conflicts with a critical fix, the **fix takes precedence**
5. Do NOT skip verification steps — run them before moving to the next section
6. If a step fails, fix it before proceeding
7. After completing all sections, run the final integration test in `09-VERIFICATION.md`

## Critical Rules (from expert review)

- **Use Drizzle ORM exclusively** — never raw SQL `db.query()` calls
- **Use postgres-js only** — do NOT install or use the `pg` package
- **All queries must be tenant-scoped** — every SELECT includes `tenantId` filter
- **Audit logs are immutable** — database trigger prevents UPDATE/DELETE
- **Validate env vars at startup** — fail fast on missing config

## Execution Order

| Step | File | What It Builds | Estimated Time |
|------|------|----------------|----------------|
| 01 | `01-PROJECT-INIT.md` | Next.js project, dependencies, folder structure | 10 min |
| 02 | `02-DATABASE-SCHEMA.md` | PostgreSQL schema with all tables, RLS, indexes | 15 min |
| 03 | `03-AUTH-AND-TENANCY.md` | Clerk auth, middleware, tenant context, RBAC | 15 min |
| 04 | `04-CORE-LAYOUT.md` | App shell, navigation, dashboard, theming | 20 min |
| 05 | `05-DOCUMENT-CONTROL.md` | Document control module (first QMS module) | 25 min |
| 06 | `06-CAPA-MODULE.md` | CAPA & Nonconformance module | 25 min |
| 07 | `07-AUDIT-TRAIL.md` | Part 11 compliant audit trail + e-signatures | 15 min |
| 08 | `08-AI-INTEGRATION.md` | Claude API integration, RAG pipeline foundation | 20 min |
| 09 | `09-VERIFICATION.md` | Full integration test, lint, build verification | 10 min |

## Approved Tech Stack (Tyler approved 2026-03-31)

```
Frontend:     Next.js 14+ (App Router, React 18, TypeScript strict)
UI:           Tailwind CSS + shadcn/ui
Backend:      Next.js API Routes + tRPC
Database:     PostgreSQL 16 with RLS + pgvector
ORM:          Drizzle ORM
Auth:         Clerk
AI/LLM:       Claude API (Anthropic) with provider abstraction
Cache/Queue:  Redis + BullMQ
Storage:      AWS S3
Hosting:      Vercel (Phase 1)
CI/CD:        GitHub Actions
Monitoring:   Sentry + PostHog
Email:        Resend
Payments:     Stripe
```

## Project Location

All code goes in: `QMS Saas/platform/` (the Next.js project root)

## Architecture Principle

**Monolith-first.** One Next.js application with clean module boundaries. Extract services later at $500K+ ARR. Every table has `tenant_id` with RLS. Every action is audit-logged.

---

*Reference: See `OUTPUTS/development/architecture-v1-complete.md` for full architecture details.*
