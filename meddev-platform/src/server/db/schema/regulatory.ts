import { pgTable, pgEnum, text, timestamp, index } from "drizzle-orm/pg-core";

export const submissionTypeEnum = pgEnum("submission_type", [
  "fda_510k",
  "fda_pma",
  "fda_de_novo",
  "ce_mark",
  "mdr",
  "health_canada",
  "tga",
  "pmda",
]);

export const submissionStatusEnum = pgEnum("submission_status", [
  "preparing",
  "submitted",
  "under_review",
  "additional_info",
  "approved",
  "rejected",
  "withdrawn",
]);

export const regulatorySubmissions = pgTable(
  "regulatory_submissions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    productId: text("product_id").notNull(),
    type: submissionTypeEnum("type").notNull(),
    market: text("market"),
    regulatoryBody: text("regulatory_body"),
    submissionNumber: text("submission_number"),
    status: submissionStatusEnum("status").default("preparing").notNull(),
    submittedAt: timestamp("submitted_at"),
    approvedAt: timestamp("approved_at"),
    expiresAt: timestamp("expires_at"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("regulatory_submissions_tenant_id_idx").on(table.tenantId),
  ]
);
