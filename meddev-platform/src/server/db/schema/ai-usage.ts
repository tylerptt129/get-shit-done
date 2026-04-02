import {
  pgTable,
  text,
  timestamp,
  integer,
  real,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const aiUsageLogs = pgTable(
  "ai_usage_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    userId: text("user_id"),
    model: text("model").notNull(),
    provider: text("provider").notNull(),
    promptTokens: integer("prompt_tokens"),
    completionTokens: integer("completion_tokens"),
    totalTokens: integer("total_tokens"),
    estimatedCost: real("estimated_cost"),
    feature: text("feature"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("ai_usage_logs_tenant_id_idx").on(table.tenantId)]
);
