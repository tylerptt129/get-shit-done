# Critical Fixes — Apply During Execution

**Date:** 2026-03-31
**Source:** Expert review of all instruction files

> Claude Code: Read this file BEFORE executing any instruction step. Apply these fixes when you encounter the relevant code.

---

## Fix 1: Drizzle Config Path (Step 02)

In `drizzle.config.ts`, use explicit index path, NOT glob:
```typescript
// CORRECT:
schema: "./src/server/db/schema/index.ts",
// NOT: "./src/server/db/schema/*"
```

## Fix 2: Use postgres-js Consistently (Steps 02-03)

Use ONLY `postgres` (postgres-js) package. Do NOT mix with `pg` (node-postgres).

```typescript
// CORRECT — src/server/db/index.ts:
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
```

Do NOT use `pg.Pool` anywhere. If you see `pg.Pool` in step 03, replace with the Drizzle `db` instance.

## Fix 3: Use Drizzle ORM, NOT Raw SQL (Step 03)

All database queries MUST use Drizzle ORM, not raw `db.query()`. Example:

```typescript
// WRONG:
const result = await db.query("SELECT * FROM users WHERE clerk_id = $1", [clerkId]);

// CORRECT:
import { eq, and } from "drizzle-orm";
import { users } from "@/server/db/schema";

const result = await db
  .select()
  .from(users)
  .where(and(
    eq(users.clerkUserId, clerkId),
    eq(users.tenantId, tenantId)
  ));
```

## Fix 4: RLS Session Variable Initialization (Step 03)

Add this SQL to the database migration BEFORE creating RLS policies:

```sql
-- Enable custom session variable for RLS
-- PostgreSQL allows setting arbitrary GUC variables with set_config
-- No ALTER DATABASE needed — set_config works for per-transaction vars

-- Helper function for tenant context
CREATE OR REPLACE FUNCTION set_tenant_context(p_tenant_id UUID) RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', p_tenant_id::text, true);
END;
$$ LANGUAGE plpgsql;
```

## Fix 5: Clerk Webhook — Correct User/Tenant Creation (Step 03)

When handling `user.created` webhook, you MUST create a tenant first:

```typescript
// On user.created:
// 1. Create default tenant
const [tenant] = await db.insert(tenants).values({
  name: `${firstName}'s Organization`,
  slug: `org-${clerkUserId}`,
  clerkOrgId: `personal-${clerkUserId}`,
}).returning();

// 2. THEN create user with valid tenant reference
await db.insert(users).values({
  clerkUserId: clerkUserId,
  tenantId: tenant.id,
  email: email,
  fullName: `${firstName} ${lastName}`,
  role: "admin",
});
```

For `organization.created` webhook (better approach for multi-tenant):
```typescript
// On organization.created:
const [tenant] = await db.insert(tenants).values({
  name: orgName,
  slug: orgSlug,
  clerkOrgId: orgId,
}).returning();
```

## Fix 6: Audit Log Immutability Trigger (Step 07)

Add this SQL AFTER creating the audit_logs table:

```sql
-- Part 11 Compliance: Prevent modification of audit logs
CREATE OR REPLACE FUNCTION prevent_audit_log_modification()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Audit logs are immutable per 21 CFR Part 11';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_log_immutable_trigger
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW
EXECUTE FUNCTION prevent_audit_log_modification();
```

## Fix 7: AI Cost Calculation (Step 08)

Fix the token cost formula:

```typescript
// CORRECT:
const costUsd =
  (inputTokens / 1_000_000) * modelPricePerMillionInput +
  (outputTokens / 1_000_000) * modelPricePerMillionOutput;
```

## Fix 8: Add Database Indexes for Common Queries

Add after schema creation:

```sql
-- Performance indexes for common QMS queries
CREATE INDEX idx_documents_tenant_status ON documents(tenant_id, status);
CREATE INDEX idx_capas_tenant_status ON capas(tenant_id, status);
CREATE INDEX idx_audit_logs_tenant_created ON audit_logs(tenant_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(tenant_id, entity_type, entity_id);
CREATE INDEX idx_training_records_tenant_status ON training_records(tenant_id, status);
CREATE INDEX idx_complaints_tenant_status ON complaints(tenant_id, status);
CREATE INDEX idx_notifications_tenant_user ON notifications(tenant_id, user_id, read_at);
```

## Fix 9: Environment Variable Validation

Add `src/lib/env.ts`:

```typescript
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  CLERK_SECRET_KEY: z.string().startsWith("sk_"),
  CLERK_WEBHOOK_SECRET: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

Import this in `src/server/db/index.ts` and `src/server/ai/provider.ts` to fail fast on missing config.

---

## Execution Checklist After Fixes

When executing the instruction files, Claude Code should:

1. ✅ Read `00-CRITICAL-FIXES.md` first
2. ✅ Apply Fix 1 when creating drizzle.config.ts
3. ✅ Apply Fix 2 when setting up database connection
4. ✅ Apply Fix 3 when writing any database query
5. ✅ Apply Fix 4 when creating RLS policies
6. ✅ Apply Fix 5 when writing Clerk webhook handler
7. ✅ Apply Fix 6 when creating audit trail tables
8. ✅ Apply Fix 7 when implementing AI cost tracking
9. ✅ Apply Fix 8 after all schema migrations
10. ✅ Apply Fix 9 at project init

---

*Generated by AI. Requires qualified professional review.*
