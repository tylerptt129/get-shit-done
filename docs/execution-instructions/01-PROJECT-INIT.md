# 01 — Project Initialization

## Objective
Create the Next.js project with all dependencies and folder structure.

---

## Step 1: Create Next.js Project

```bash
cd "QMS Saas"
npx create-next-app@latest platform --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd platform
```

## Step 2: Install Core Dependencies

```bash
# Database
npm install drizzle-orm postgres
npm install -D drizzle-kit

# Auth
npm install @clerk/nextjs

# API layer
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query superjson zod

# UI components
npx shadcn@latest init --defaults
npx shadcn@latest add button card dialog dropdown-menu form input label select separator sheet sidebar table tabs textarea toast badge avatar command popover calendar

# Utilities
npm install date-fns lucide-react clsx tailwind-merge class-variance-authority

# AI (Phase 1 foundation)
npm install @anthropic-ai/sdk

# Email
npm install resend

# Validation
npm install zod
```

## Step 3: Create Folder Structure

```bash
mkdir -p src/app/\(auth\)/sign-in/[[...sign-in]]
mkdir -p src/app/\(auth\)/sign-up/[[...sign-up]]
mkdir -p src/app/\(dashboard\)/dashboard
mkdir -p src/app/\(dashboard\)/documents
mkdir -p src/app/\(dashboard\)/capas
mkdir -p src/app/\(dashboard\)/audits
mkdir -p src/app/\(dashboard\)/training
mkdir -p src/app/\(dashboard\)/devices
mkdir -p src/app/\(dashboard\)/complaints
mkdir -p src/app/\(dashboard\)/risk
mkdir -p src/app/\(dashboard\)/suppliers
mkdir -p src/app/\(dashboard\)/labels
mkdir -p src/app/\(dashboard\)/settings
mkdir -p src/app/api/trpc/[trpc]
mkdir -p src/app/api/webhooks/clerk
mkdir -p src/server/db
mkdir -p src/server/api/routers
mkdir -p src/server/api
mkdir -p src/server/services
mkdir -p src/server/ai
mkdir -p src/lib
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/modules/documents
mkdir -p src/components/modules/capas
mkdir -p src/components/modules/audits
mkdir -p src/components/modules/training
mkdir -p src/components/modules/devices
mkdir -p src/components/modules/complaints
mkdir -p src/components/modules/risk
mkdir -p src/components/modules/suppliers
mkdir -p src/components/modules/labels
mkdir -p src/components/shared
mkdir -p src/types
mkdir -p src/hooks
```

## Step 4: Create Environment File Template

Create `.env.local` with placeholder values:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/meddev_qms

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
CLERK_WEBHOOK_SECRET=whsec_placeholder

# Anthropic AI
ANTHROPIC_API_KEY=sk-ant-placeholder

# AWS S3
AWS_ACCESS_KEY_ID=placeholder
AWS_SECRET_ACCESS_KEY=placeholder
AWS_REGION=us-east-1
S3_BUCKET_NAME=meddev-qms-documents

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MedDev QMS
```

## Step 5: Configure TypeScript Strict Mode

Update `tsconfig.json` — ensure these are set:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Step 6: Create Utility Files

### `src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function generateDocNumber(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(5, "0")}`;
}
```

---

## Verification

```bash
cd platform
npm run build
# Should compile with zero errors
npm run dev
# Should start on http://localhost:3000 with Next.js default page
```

**Pass criteria:** `npm run build` exits with code 0. Dev server starts successfully.

---

*Next: `02-DATABASE-SCHEMA.md`*
