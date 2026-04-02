import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const capaTypeEnum = pgEnum("capa_type", [
  "corrective",
  "preventive",
  "both",
]);

export const capaStatusEnum = pgEnum("capa_status", [
  "initiated",
  "investigating",
  "root_cause_identified",
  "action_planned",
  "action_implemented",
  "effectiveness_check",
  "closed",
]);

export const priorityEnum = pgEnum("priority", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const complaintSourceEnum = pgEnum("complaint_source", [
  "customer",
  "field",
  "internal",
  "regulatory",
  "distributor",
]);

export const complaintStatusEnum = pgEnum("complaint_status", [
  "received",
  "under_investigation",
  "determined_reportable",
  "mdr_filed",
  "closed",
]);

export const ncTypeEnum = pgEnum("nc_type", [
  "incoming_material",
  "in_process",
  "finished_product",
  "field_return",
  "document",
]);

export const ncStatusEnum = pgEnum("nc_status", [
  "identified",
  "quarantined",
  "under_review",
  "dispositioned",
  "closed",
]);

export const capas = pgTable(
  "capas",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    capaNumber: text("capa_number").notNull(),
    title: text("title").notNull(),
    type: capaTypeEnum("type").notNull(),
    source: text("source"),
    description: text("description"),
    rootCause: text("root_cause"),
    correction: text("correction"),
    correctiveAction: text("corrective_action"),
    preventiveAction: text("preventive_action"),
    status: capaStatusEnum("status").default("initiated").notNull(),
    priority: priorityEnum("priority").default("medium").notNull(),
    ownerId: text("owner_id"),
    dueDate: timestamp("due_date"),
    closedAt: timestamp("closed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("capas_tenant_id_idx").on(table.tenantId),
    index("capas_status_idx").on(table.status),
  ]
);

export const complaints = pgTable(
  "complaints",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    complaintNumber: text("complaint_number").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    source: complaintSourceEnum("source").notNull(),
    severity: priorityEnum("severity").default("medium").notNull(),
    reportable: boolean("reportable").default(false).notNull(),
    status: complaintStatusEnum("status").default("received").notNull(),
    receivedDate: timestamp("received_date"),
    closedDate: timestamp("closed_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("complaints_tenant_id_idx").on(table.tenantId)]
);

export const nonconformances = pgTable(
  "nonconformances",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    ncNumber: text("nc_number").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    type: ncTypeEnum("type").notNull(),
    source: text("source"),
    status: ncStatusEnum("status").default("identified").notNull(),
    assigneeId: text("assignee_id"),
    disposition: text("disposition"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("nonconformances_tenant_id_idx").on(table.tenantId)]
);
