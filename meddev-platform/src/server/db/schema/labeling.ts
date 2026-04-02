import { pgTable, pgEnum, text, timestamp, index } from "drizzle-orm/pg-core";

export const labelTypeEnum = pgEnum("label_type", [
  "device_label",
  "ifu",
  "package_insert",
  "outer_packaging",
  "shipping_label",
  "udi_label",
]);

export const labelStatusEnum = pgEnum("label_status", [
  "draft",
  "in_review",
  "approved",
  "printed",
  "obsolete",
]);

export const labels = pgTable(
  "labels",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    productId: text("product_id").notNull(),
    name: text("name").notNull(),
    type: labelTypeEnum("type").notNull(),
    version: text("version"),
    status: labelStatusEnum("status").default("draft").notNull(),
    content: text("content"),
    udiDi: text("udi_di"),
    lotNumber: text("lot_number"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("labels_tenant_id_idx").on(table.tenantId)]
);
