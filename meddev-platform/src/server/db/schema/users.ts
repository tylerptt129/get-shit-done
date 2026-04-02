import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { tenants } from "./tenants";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "quality_manager",
  "regulatory_manager",
  "department_head",
  "engineer",
  "specialist",
  "viewer",
]);

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    clerkUserId: text("clerk_user_id").notNull().unique(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    title: text("title"),
    role: userRoleEnum("role").notNull(),
    department: text("department"),
    avatar: text("avatar"),
    isActive: boolean("is_active").default(true).notNull(),
    lastLogin: timestamp("last_login"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("users_tenant_id_idx").on(table.tenantId)]
);

export const usersRelations = relations(users, ({ one }) => ({
  tenant: one(tenants, {
    fields: [users.tenantId],
    references: [tenants.id],
  }),
}));
