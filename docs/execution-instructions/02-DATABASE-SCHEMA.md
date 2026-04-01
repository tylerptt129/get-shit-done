# 02 — Database Schema

## Objective
Create the complete Drizzle ORM schema matching the approved architecture document. All tables include `tenantId` for RLS.

---

## Step 1: Configure Drizzle

### Create `drizzle.config.ts` in project root:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Create `src/server/db/index.ts`:

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
export type Database = typeof db;
```

## Step 2: Create Schema Files

Create each file under `src/server/db/schema/`:

### `src/server/db/schema/index.ts`
Re-export all schema files:
```typescript
export * from "./tenants";
export * from "./users";
export * from "./audit-logs";
export * from "./documents";
export * from "./capas";
export * from "./devices";
export * from "./training";
export * from "./audits";
export * from "./complaints";
export * from "./risk";
export * from "./suppliers";
export * from "./labels";
export * from "./ai-usage";
export * from "./entity-links";
export * from "./notifications";
export * from "./electronic-signatures";
```

### `src/server/db/schema/tenants.ts`
```typescript
import { pgTable, uuid, text, jsonb, integer, timestamp } from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  clerkOrgId: text("clerk_org_id").unique().notNull(),
  settings: jsonb("settings").default({}),
  markets: text("markets").array().default(["FDA", "EU_MDR"]),
  planTier: text("plan_tier").notNull().default("starter"),
  aiTokenLimit: integer("ai_token_limit").notNull().default(50000),
  aiTokensUsed: integer("ai_tokens_used").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/users.ts`
```typescript
import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  clerkUserId: text("clerk_user_id").unique().notNull(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("viewer"),
  department: text("department"),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/audit-logs.ts`
```typescript
import { pgTable, uuid, text, jsonb, inet, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  userId: uuid("user_id").references(() => users.id),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id").notNull(),
  action: text("action").notNull(),
  fieldChanges: jsonb("field_changes"),
  ipAddress: inet("ip_address"),
  userAgent: text("user_agent"),
  signatureData: jsonb("signature_data"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/electronic-signatures.ts`
```typescript
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const electronicSignatures = pgTable("electronic_signatures", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id").notNull(),
  meaning: text("meaning").notNull(), // authored, reviewed, approved, verified, released
  signatureHash: text("signature_hash").notNull(),
  signedAt: timestamp("signed_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/documents.ts`
```typescript
import { pgTable, uuid, text, integer, date, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  docNumber: text("doc_number").notNull(),
  title: text("title").notNull(),
  docType: text("doc_type").notNull(), // quality_manual, sop, work_instruction, form, template, policy, specification, protocol, report, record
  department: text("department").notNull(),
  status: text("status").notNull().default("draft"), // draft, in_review, approved, effective, superseded, retired
  currentVersion: integer("current_version").notNull().default(1),
  content: text("content"),
  fileKey: text("file_key"),
  reviewIntervalMonths: integer("review_interval_months").default(36),
  nextReviewDate: date("next_review_date"),
  effectiveDate: date("effective_date"),
  retiredDate: date("retired_date"),
  ownerId: uuid("owner_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueDocNumber: uniqueIndex("documents_tenant_doc_number").on(table.tenantId, table.docNumber),
}));

export const documentVersions = pgTable("document_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  documentId: uuid("document_id").notNull().references(() => documents.id),
  versionNumber: integer("version_number").notNull(),
  content: text("content"),
  fileKey: text("file_key"),
  changeSummary: text("change_summary"),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/capas.ts`
```typescript
import { pgTable, uuid, text, date, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const capas = pgTable("capas", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  capaNumber: text("capa_number").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(), // corrective, preventive, both
  source: text("source").notNull(), // complaint, audit, ncr, trend, pms, management_review, regulatory, supplier, internal, other
  sourceId: uuid("source_id"),
  status: text("status").notNull().default("open"), // open, investigation, root_cause, action_planning, implementation, effectiveness_check, closed
  priority: text("priority").default("medium"), // critical, high, medium, low
  description: text("description").notNull(),
  rootCause: text("root_cause"),
  rootCauseMethod: text("root_cause_method"), // 5_whys, ishikawa, fault_tree
  correctiveAction: text("corrective_action"),
  preventiveAction: text("preventive_action"),
  effectivenessCriteria: text("effectiveness_criteria"),
  effectivenessCheckDate: date("effectiveness_check_date"),
  effectivenessVerified: boolean("effectiveness_verified").default(false),
  regulatoryReportable: boolean("regulatory_reportable").default(false),
  ownerId: uuid("owner_id").references(() => users.id),
  dueDate: date("due_date"),
  closedDate: date("closed_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueCapaNumber: uniqueIndex("capas_tenant_capa_number").on(table.tenantId, table.capaNumber),
}));

export const ncrs = pgTable("ncrs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  ncrNumber: text("ncr_number").notNull(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  deviceId: uuid("device_id"),
  lotBatch: text("lot_batch"),
  quantityAffected: integer("quantity_affected"),
  description: text("description").notNull(),
  disposition: text("disposition"),
  dispositionRationale: text("disposition_rationale"),
  capaId: uuid("capa_id").references(() => capas.id),
  status: text("status").notNull().default("open"),
  ownerId: uuid("owner_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueNcrNumber: uniqueIndex("ncrs_tenant_ncr_number").on(table.tenantId, table.ncrNumber),
}));
```

### `src/server/db/schema/devices.ts`
```typescript
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const devices = pgTable("devices", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  deviceName: text("device_name").notNull(),
  modelNumber: text("model_number"),
  catalogNumber: text("catalog_number"),
  fdaProductCode: text("fda_product_code"),
  fdaDeviceClass: text("fda_device_class"),
  fdaRegulationNumber: text("fda_regulation_number"),
  fdaSubmissionType: text("fda_submission_type"),
  fdaClearanceNumber: text("fda_clearance_number"),
  euMdrClass: text("eu_mdr_class"),
  euMdrRule: text("eu_mdr_rule"),
  nbCertificateNumber: text("nb_certificate_number"),
  udiDi: text("udi_di"),
  gtin: text("gtin"),
  status: text("status").notNull().default("active"),
  lifecycleStage: text("lifecycle_stage").default("development"),
  riskClass: text("risk_class"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/training.ts`
```typescript
import { pgTable, uuid, text, date, numeric, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";
import { documents } from "./documents";

export const trainingRecords = pgTable("training_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  documentId: uuid("document_id").references(() => documents.id),
  trainingType: text("training_type").notNull(),
  status: text("status").notNull().default("assigned"),
  assignedDate: date("assigned_date").notNull(),
  dueDate: date("due_date").notNull(),
  completedDate: date("completed_date"),
  competencyScore: numeric("competency_score"),
  assessedBy: uuid("assessed_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/audits.ts`
```typescript
import { pgTable, uuid, text, date, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";
import { documents } from "./documents";
import { capas } from "./capas";

export const audits = pgTable("audits", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  auditNumber: text("audit_number").notNull(),
  auditType: text("audit_type").notNull(),
  scope: text("scope").notNull(),
  isoClauses: text("iso_clauses").array(),
  status: text("status").notNull().default("planned"),
  scheduledDate: date("scheduled_date"),
  completedDate: date("completed_date"),
  leadAuditorId: uuid("lead_auditor_id").references(() => users.id),
  findingsMajor: integer("findings_major").default(0),
  findingsMinor: integer("findings_minor").default(0),
  observations: integer("observations").default(0),
  reportDocId: uuid("report_doc_id").references(() => documents.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueAuditNumber: uniqueIndex("audits_tenant_audit_number").on(table.tenantId, table.auditNumber),
}));

export const auditFindings = pgTable("audit_findings", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  auditId: uuid("audit_id").notNull().references(() => audits.id),
  findingNumber: text("finding_number").notNull(),
  classification: text("classification").notNull(),
  isoClause: text("iso_clause"),
  description: text("description").notNull(),
  evidence: text("evidence"),
  capaId: uuid("capa_id").references(() => capas.id),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/complaints.ts`
```typescript
import { pgTable, uuid, text, date, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { devices } from "./devices";
import { capas } from "./capas";

export const complaints = pgTable("complaints", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  complaintNumber: text("complaint_number").notNull(),
  deviceId: uuid("device_id").references(() => devices.id),
  source: text("source").notNull(),
  dateReceived: date("date_received").notNull(),
  description: text("description").notNull(),
  patientInvolvement: boolean("patient_involvement").default(false),
  injuryDeath: boolean("injury_death").default(false),
  malfunction: boolean("malfunction").default(false),
  investigation: text("investigation"),
  rootCause: text("root_cause"),
  reportableFda: boolean("reportable_fda").default(false),
  reportableEu: boolean("reportable_eu").default(false),
  capaId: uuid("capa_id").references(() => capas.id),
  status: text("status").notNull().default("received"),
  closedDate: date("closed_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueComplaintNumber: uniqueIndex("complaints_tenant_number").on(table.tenantId, table.complaintNumber),
}));
```

### `src/server/db/schema/risk.ts`
```typescript
import { pgTable, uuid, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { devices } from "./devices";

export const riskItems = pgTable("risk_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  deviceId: uuid("device_id").notNull().references(() => devices.id),
  hazardCategory: text("hazard_category").notNull(),
  hazardousSituation: text("hazardous_situation").notNull(),
  harm: text("harm").notNull(),
  initialSeverity: integer("initial_severity").notNull(),
  initialProbability: integer("initial_probability").notNull(),
  initialRiskLevel: text("initial_risk_level"),
  riskControls: jsonb("risk_controls"),
  residualSeverity: integer("residual_severity"),
  residualProbability: integer("residual_probability"),
  residualRiskLevel: text("residual_risk_level"),
  status: text("status").notNull().default("identified"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/suppliers.ts`
```typescript
import { pgTable, uuid, text, numeric, date, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { documents } from "./documents";

export const suppliers = pgTable("suppliers", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  name: text("name").notNull(),
  supplierNumber: text("supplier_number").notNull(),
  classification: text("classification").notNull(),
  status: text("status").notNull().default("pending"),
  overallScore: numeric("overall_score"),
  qualityAgreementId: uuid("quality_agreement_id").references(() => documents.id),
  lastEvaluationDate: date("last_evaluation_date"),
  nextEvaluationDate: date("next_evaluation_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueSupplierNumber: uniqueIndex("suppliers_tenant_number").on(table.tenantId, table.supplierNumber),
}));

export const equipment = pgTable("equipment", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  equipmentId: text("equipment_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  location: text("location"),
  calibrationIntervalDays: integer("calibration_interval_days"),
  lastCalibrationDate: date("last_calibration_date"),
  nextCalibrationDate: date("next_calibration_date"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  uniqueEquipmentId: uniqueIndex("equipment_tenant_id").on(table.tenantId, table.equipmentId),
}));
```

### `src/server/db/schema/labels.ts`
```typescript
import { pgTable, uuid, text, jsonb, integer, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { devices } from "./devices";

export const labels = pgTable("labels", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  deviceId: uuid("device_id").notNull().references(() => devices.id),
  labelType: text("label_type").notNull(),
  market: text("market").notNull(),
  content: jsonb("content").notNull(),
  symbols: text("symbols").array(),
  complianceStatus: jsonb("compliance_status"),
  version: integer("version").notNull().default(1),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/ai-usage.ts`
```typescript
import { pgTable, uuid, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const aiUsage = pgTable("ai_usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  feature: text("feature").notNull(),
  model: text("model").notNull(),
  inputTokens: integer("input_tokens").notNull(),
  outputTokens: integer("output_tokens").notNull(),
  costUsd: numeric("cost_usd", { precision: 10, scale: 6 }),
  latencyMs: integer("latency_ms"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/entity-links.ts`
```typescript
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const entityLinks = pgTable("entity_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  sourceType: text("source_type").notNull(),
  sourceId: uuid("source_id").notNull(),
  targetType: text("target_type").notNull(),
  targetId: uuid("target_id").notNull(),
  linkType: text("link_type").notNull(),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
```

### `src/server/db/schema/notifications.ts`
```typescript
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { users } from "./users";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body"),
  entityType: text("entity_type"),
  entityId: uuid("entity_id"),
  readAt: timestamp("read_at", { withTimezone: true }),
  emailSentAt: timestamp("email_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
```

## Verification

```bash
# Generate migration (dry run — verifies schema is valid)
npx drizzle-kit generate
# Should create migration files in ./drizzle/ with zero errors

# TypeScript check
npx tsc --noEmit
# Should exit with code 0
```

**Pass criteria:** Drizzle generates valid SQL migration files. TypeScript compiles with zero errors.

---

*Next: `03-AUTH-AND-TENANCY.md`*
