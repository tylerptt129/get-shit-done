import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const deviceClassEnum = pgEnum("device_class", [
  "class_i",
  "class_ii",
  "class_iii",
]);

export const productStatusEnum = pgEnum("product_status", [
  "development",
  "verification",
  "validation",
  "released",
  "discontinued",
]);

export const designPhaseEnum = pgEnum("design_phase", [
  "concept",
  "feasibility",
  "design_input",
  "design_output",
  "verification",
  "validation",
  "transfer",
]);

export const riskLevelEnum = pgEnum("risk_level", [
  "negligible",
  "low",
  "medium",
  "high",
  "unacceptable",
]);

export const riskStatusEnum = pgEnum("risk_status", [
  "identified",
  "analyzed",
  "mitigated",
  "accepted",
  "monitored",
]);

export const products = pgTable(
  "products",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    name: text("name").notNull(),
    productCode: text("product_code").notNull(),
    description: text("description"),
    classification: deviceClassEnum("classification"),
    regulatoryClass: text("regulatory_class"),
    intendedUse: text("intended_use"),
    status: productStatusEnum("status").default("development").notNull(),
    version: text("version"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("products_tenant_id_idx").on(table.tenantId)]
);

export const designInputs = pgTable(
  "design_inputs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    productId: text("product_id").notNull(),
    requirement: text("requirement").notNull(),
    source: text("source"),
    type: text("type"),
    priority: text("priority"),
    status: text("status"),
    rationale: text("rationale"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("design_inputs_tenant_id_idx").on(table.tenantId)]
);

export const designOutputs = pgTable(
  "design_outputs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    productId: text("product_id").notNull(),
    description: text("description").notNull(),
    type: text("type"),
    status: text("status"),
    documentRef: text("document_ref"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("design_outputs_tenant_id_idx").on(table.tenantId)]
);

export const designReviews = pgTable(
  "design_reviews",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    productId: text("product_id").notNull(),
    reviewerId: text("reviewer_id"),
    phase: designPhaseEnum("phase").notNull(),
    status: text("status"),
    scheduledAt: timestamp("scheduled_at"),
    completedAt: timestamp("completed_at"),
    findings: text("findings"),
    decision: text("decision"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("design_reviews_tenant_id_idx").on(table.tenantId)]
);

export const riskAssessments = pgTable(
  "risk_assessments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    productId: text("product_id").notNull(),
    title: text("title").notNull(),
    hazard: text("hazard").notNull(),
    hazardSituation: text("hazard_situation"),
    harm: text("harm"),
    severityBefore: integer("severity_before"),
    probabilityBefore: integer("probability_before"),
    riskLevelBefore: riskLevelEnum("risk_level_before"),
    mitigationMeasure: text("mitigation_measure"),
    severityAfter: integer("severity_after"),
    probabilityAfter: integer("probability_after"),
    riskLevelAfter: riskLevelEnum("risk_level_after"),
    status: riskStatusEnum("status").default("identified").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("risk_assessments_tenant_id_idx").on(table.tenantId)]
);
