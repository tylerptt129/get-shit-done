# MedDev Automation QMS Platform — Claude Code Instructions

## Project Overview
AI-native Quality Management System SaaS for medical device manufacturers.
Built by MedDev Automation Technologies, LLC (Tyler Ford, Founder).

## Execution Instructions
All build instructions are in this repo at: `docs/execution-instructions/`

## How to Execute
1. **FIRST** read `docs/execution-instructions/00-CRITICAL-FIXES.md` — contains 9 expert-reviewed fixes that override specific code in later steps
2. **THEN** read `docs/execution-instructions/00-MASTER-INSTRUCTIONS.md` — overview of execution order and approved tech stack
3. **THEN** execute steps 01 through 09 sequentially:
   - `docs/execution-instructions/01-PROJECT-INIT.md` — Create Next.js project, install dependencies, create folder structure
   - `docs/execution-instructions/02-DATABASE-SCHEMA.md` — Drizzle ORM schema (20+ tables with RLS)
   - `docs/execution-instructions/03-AUTH-AND-TENANCY.md` — Clerk auth, tRPC, multi-tenant middleware
   - `docs/execution-instructions/04-CORE-LAYOUT.md` — Dashboard shell, sidebar navigation, KPI cards
   - `docs/execution-instructions/05-DOCUMENT-CONTROL.md` — Document control module (CRUD, workflow, UI)
   - `docs/execution-instructions/06-CAPA-MODULE.md` — CAPA and nonconformance module (7-stage workflow)
   - `docs/execution-instructions/07-AUDIT-TRAIL.md` — Part 11 audit trail + electronic signatures
   - `docs/execution-instructions/08-AI-INTEGRATION.md` — Claude API integration, RAG foundation
   - `docs/execution-instructions/09-VERIFICATION.md` — Build, security, compliance verification

## Critical Rules
- Use Drizzle ORM exclusively — never raw SQL db.query() calls
- Use postgres-js only — do NOT install or use the pg package
- All queries must be tenant-scoped — every SELECT includes tenantId filter
- Audit logs are immutable — database trigger prevents UPDATE/DELETE
- Validate env vars at startup — fail fast on missing config
- When a step conflicts with 00-CRITICAL-FIXES.md, the fix takes precedence

## Approved Tech Stack (Tyler approved 2026-03-31)
- Frontend: Next.js 14+ (App Router, React 18, TypeScript strict)
- UI: Tailwind CSS + shadcn/ui
- Backend: Next.js API Routes + tRPC
- Database: PostgreSQL 16 with RLS + pgvector
- ORM: Drizzle ORM
- Auth: Clerk
- AI/LLM: Claude API (Anthropic) with provider abstraction

## Verification
After each step, run the verification commands listed at the bottom of that step file. Do NOT proceed to the next step until verification passes.
