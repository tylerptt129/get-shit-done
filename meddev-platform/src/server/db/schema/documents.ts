import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const documentTypeEnum = pgEnum("document_type", [
  "sop",
  "work_instruction",
  "form",
  "template",
  "policy",
  "specification",
  "protocol",
  "report",
  "dhf",
  "dmr",
  "dhr",
  "technical_file",
]);

export const documentStatusEnum = pgEnum("document_status", [
  "draft",
  "in_review",
  "approved",
  "effective",
  "obsolete",
  "archived",
]);

export const approvalStatusEnum = pgEnum("approval_status", [
  "pending",
  "approved",
  "rejected",
  "recalled",
]);

export const documents = pgTable(
  "documents",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    documentNumber: text("document_number").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    type: documentTypeEnum("type").notNull(),
    category: text("category"),
    status: documentStatusEnum("status").default("draft").notNull(),
    version: text("version"),
    revision: text("revision"),
    effectiveDate: timestamp("effective_date"),
    reviewDate: timestamp("review_date"),
    expiryDate: timestamp("expiry_date"),
    filePath: text("file_path"),
    fileSize: integer("file_size"),
    content: text("content"),
    createdById: text("created_by_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("documents_tenant_id_idx").on(table.tenantId),
    index("documents_status_idx").on(table.status),
  ]
);

export const documentVersions = pgTable(
  "document_versions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    documentId: text("document_id").notNull(),
    version: text("version").notNull(),
    revision: text("revision"),
    changes: text("changes"),
    filePath: text("file_path"),
    createdById: text("created_by_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("document_versions_tenant_id_idx").on(table.tenantId),
    index("document_versions_document_id_idx").on(table.documentId),
  ]
);

export const documentApprovals = pgTable(
  "document_approvals",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    documentId: text("document_id").notNull(),
    approverId: text("approver_id").notNull(),
    status: approvalStatusEnum("status").default("pending").notNull(),
    comments: text("comments"),
    approvedAt: timestamp("approved_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("document_approvals_tenant_id_idx").on(table.tenantId)]
);

export const documentsRelations = relations(documents, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [documents.createdById],
    references: [users.id],
  }),
  versions: many(documentVersions),
  approvals: many(documentApprovals),
}));

export const documentVersionsRelations = relations(
  documentVersions,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentVersions.documentId],
      references: [documents.id],
    }),
    createdBy: one(users, {
      fields: [documentVersions.createdById],
      references: [users.id],
    }),
  })
);

export const documentApprovalsRelations = relations(
  documentApprovals,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentApprovals.documentId],
      references: [documents.id],
    }),
    approver: one(users, {
      fields: [documentApprovals.approverId],
      references: [users.id],
    }),
  })
);
