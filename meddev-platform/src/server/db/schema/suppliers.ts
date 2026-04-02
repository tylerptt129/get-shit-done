import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  real,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const supplierTypeEnum = pgEnum("supplier_type", [
  "component",
  "raw_material",
  "service",
  "contract_manufacturer",
  "sterilization",
  "calibration",
  "packaging",
]);

export const supplierStatusEnum = pgEnum("supplier_status", [
  "pending",
  "approved",
  "conditional",
  "disqualified",
  "inactive",
]);

export const auditTypeEnum = pgEnum("audit_type", [
  "internal",
  "external",
  "supplier",
  "regulatory",
  "certification",
]);

export const auditStatusEnum = pgEnum("audit_status", [
  "planned",
  "in_progress",
  "completed",
  "closed",
]);

export const suppliers = pgTable(
  "suppliers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    type: supplierTypeEnum("type").notNull(),
    status: supplierStatusEnum("status").default("pending").notNull(),
    contactName: text("contact_name"),
    contactEmail: text("contact_email"),
    address: text("address"),
    qualityRating: real("quality_rating"),
    lastAuditDate: timestamp("last_audit_date"),
    nextAuditDate: timestamp("next_audit_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("suppliers_tenant_id_idx").on(table.tenantId)]
);

export const audits = pgTable(
  "audits",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    title: text("title").notNull(),
    type: auditTypeEnum("type").notNull(),
    scope: text("scope"),
    status: auditStatusEnum("status").default("planned").notNull(),
    scheduledDate: timestamp("scheduled_date"),
    completedDate: timestamp("completed_date"),
    leadAuditor: text("lead_auditor"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("audits_tenant_id_idx").on(table.tenantId)]
);

export const auditFindings = pgTable(
  "audit_findings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    auditId: text("audit_id").notNull(),
    assigneeId: text("assignee_id"),
    type: text("type"),
    severity: text("severity"),
    description: text("description"),
    clause: text("clause"),
    status: text("status"),
    dueDate: timestamp("due_date"),
    closedAt: timestamp("closed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("audit_findings_tenant_id_idx").on(table.tenantId)]
);

export const auditsRelations = relations(audits, ({ many }) => ({
  findings: many(auditFindings),
}));

export const auditFindingsRelations = relations(auditFindings, ({ one }) => ({
  audit: one(audits, {
    fields: [auditFindings.auditId],
    references: [audits.id],
  }),
}));
