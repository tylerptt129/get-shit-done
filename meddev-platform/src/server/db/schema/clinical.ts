import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const clinicalEvaluationTypeEnum = pgEnum("clinical_evaluation_type", [
  "clinical_investigation",
  "literature_review",
  "equivalence",
  "post_market_clinical",
  "registry_study",
]);

export const clinicalStatusEnum = pgEnum("clinical_status", [
  "planning",
  "active",
  "enrolling",
  "complete",
  "published",
]);

export const clinicalEvaluations = pgTable(
  "clinical_evaluations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    title: text("title").notNull(),
    type: clinicalEvaluationTypeEnum("type").notNull(),
    status: clinicalStatusEnum("status").default("planning").notNull(),
    protocol: text("protocol"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    subjectCount: integer("subject_count"),
    summary: text("summary"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("clinical_evaluations_tenant_id_idx").on(table.tenantId)]
);
