# MedDev QMS Platform

## Project Overview
FDA/ISO 13485-compliant Quality Management System platform for medical device companies.
Built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL.

## Architecture
- **Framework**: Next.js 14 App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with Radix UI primitives
- **Language**: TypeScript (strict mode)

## Key Directories
- `src/app/(dashboard)/` — Dashboard route group with shared layout
- `src/app/(dashboard)/[department]/` — Department-specific pages
- `src/components/layout/` — Sidebar, header, shared layout components
- `src/components/ui/` — Reusable UI components (shadcn/ui pattern)
- `src/lib/` — Utilities, database client, helpers
- `prisma/` — Database schema and migrations

## Regulatory Context
This platform manages compliance with:
- **ISO 13485:2016** — QMS for Medical Devices
- **21 CFR Part 820** — FDA Quality System Regulation
- **ISO 14971** — Risk Management
- **EU MDR 2017/745** — Medical Device Regulation
- **21 CFR Part 11** — Electronic Records & Signatures

## Departments
1. Quality Management — CAPAs, audits, nonconformances, complaints
2. Regulatory Affairs — Submissions, compliance tracking
3. Design Controls — Design inputs/outputs, reviews, V&V
4. Production — Manufacturing, NCRs, batch records
5. Document Control — SOPs, work instructions, approvals
6. Labeling — UDI, IFU, device labels, compliance
7. Clinical — Evaluations, investigations, post-market
8. Training — Competency tracking, SOP training records
9. Supply Chain — Supplier qualification, audits, materials

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run db:generate` — Generate Prisma client
- `npm run db:push` — Push schema to database
- `npm run db:migrate` — Run migrations
- `npm run db:studio` — Open Prisma Studio

## Code Style
- Use TypeScript strict mode
- Prefer server components; use 'use client' only when needed
- Follow existing patterns in the codebase
- All database queries go through Prisma client in `src/lib/db.ts`
