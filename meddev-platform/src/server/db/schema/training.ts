import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  real,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const trainingTypeEnum = pgEnum("training_type", [
  "sop_training",
  "gmp_training",
  "safety",
  "competency",
  "onboarding",
  "regulatory",
  "equipment",
]);

export const trainingRecordStatusEnum = pgEnum("training_record_status", [
  "assigned",
  "in_progress",
  "completed",
  "overdue",
  "waived",
]);

export const trainings = pgTable(
  "trainings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    type: trainingTypeEnum("type").notNull(),
    department: text("department"),
    requiredBy: timestamp("required_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("trainings_tenant_id_idx").on(table.tenantId)]
);

export const trainingRecords = pgTable(
  "training_records",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id").notNull(),
    trainingId: text("training_id").notNull(),
    userId: text("user_id").notNull(),
    status: trainingRecordStatusEnum("status").default("assigned").notNull(),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    score: real("score"),
    certificate: text("certificate"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("training_records_tenant_id_idx").on(table.tenantId)]
);

export const trainingsRelations = relations(trainings, ({ many }) => ({
  records: many(trainingRecords),
}));

export const trainingRecordsRelations = relations(
  trainingRecords,
  ({ one }) => ({
    training: one(trainings, {
      fields: [trainingRecords.trainingId],
      references: [trainings.id],
    }),
  })
);
