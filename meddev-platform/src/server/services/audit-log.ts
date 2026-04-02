import { db } from "@/server/db";
import { auditLogs } from "@/server/db/schema";

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "approve"
  | "reject"
  | "submit"
  | "archive"
  | "login"
  | "export";

interface LogAuditParams {
  tenantId: string;
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAudit(params: LogAuditParams) {
  await db.insert(auditLogs).values({
    tenantId: params.tenantId,
    userId: params.userId,
    action: params.action,
    entityType: params.entityType,
    entityId: params.entityId,
    changes: params.changes ?? null,
    ipAddress: params.ipAddress ?? null,
    userAgent: params.userAgent ?? null,
  });
}
