"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  ClipboardList,
  Calendar,
  Database,
  Shield,
  Activity,
} from "lucide-react";

const summaryCards = [
  { label: "Events Today", value: 47, icon: Activity, color: "text-gray-600", bg: "bg-gray-50" },
  { label: "This Week", value: 312, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Records", value: "8,451", icon: Database, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Immutability", value: "Enforced", icon: Shield, color: "text-green-600", bg: "bg-green-50", valueColor: "text-green-600" },
];

const auditLog = [
  { id: 1, timestamp: "2026-04-02 14:32:18", user: "Dr. Sarah Chen", action: "update", entityType: "CAPA", entityId: "CAPA-2026-041", changes: "Status: investigating -> action_planned" },
  { id: 2, timestamp: "2026-04-02 14:15:03", user: "Mark Thompson", action: "approve", entityType: "Document", entityId: "SOP-QA-012", changes: "Approved Rev 4 — Digital signature applied" },
  { id: 3, timestamp: "2026-04-02 13:48:55", user: "Lisa Park", action: "create", entityType: "Submission", entityId: "SUB-2026-005", changes: "New Health Canada submission created" },
  { id: 4, timestamp: "2026-04-02 13:22:10", user: "James Wilson", action: "update", entityType: "NCR", entityId: "NCR-2026-088", changes: "Disposition: Pending -> Use As Is" },
  { id: 5, timestamp: "2026-04-02 12:55:41", user: "Amy Rodriguez", action: "create", entityType: "Training", entityId: "TRN-REC-2026-445", changes: "Training record created for GMP Module" },
  { id: 6, timestamp: "2026-04-02 12:30:22", user: "system", action: "login", entityType: "Session", entityId: "SES-20260402-1230", changes: "User login from 10.0.1.45 — MFA verified" },
  { id: 7, timestamp: "2026-04-02 11:45:08", user: "Dr. Sarah Chen", action: "export", entityType: "Report", entityId: "RPT-CAPA-Q1-2026", changes: "Q1 2026 CAPA Summary exported as PDF" },
  { id: 8, timestamp: "2026-04-02 11:12:33", user: "Mark Thompson", action: "update", entityType: "Design", entityId: "DHF-OF-2026-003", changes: "Design input DI-002 updated — biocompat spec revised" },
  { id: 9, timestamp: "2026-04-02 10:48:19", user: "Lisa Park", action: "approve", entityType: "Label", entityId: "LBL-003", changes: "NeuroStim Controller label Rev 4 approved" },
  { id: 10, timestamp: "2026-04-02 10:15:02", user: "system", action: "login", entityType: "Session", entityId: "SES-20260402-1015", changes: "User login from 10.0.1.22 — MFA verified" },
];

function getActionColor(action: string): string {
  const colors: Record<string, string> = {
    create: "bg-green-100 text-green-800",
    update: "bg-blue-100 text-blue-800",
    approve: "bg-purple-100 text-purple-800",
    login: "bg-gray-100 text-gray-800",
    export: "bg-amber-100 text-amber-800",
  };
  return colors[action] || "bg-gray-100 text-gray-800";
}

export default function AuditTrailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <ClipboardList className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
          <p className="text-sm text-gray-500">Immutable event log &mdash; 21 CFR Part 11 compliant</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className={cn("p-2 rounded-lg w-fit", c.bg)}>
              <c.icon className={cn("h-5 w-5", c.color)} />
            </div>
            <p className={cn("mt-3 text-2xl font-bold", (c as any).valueColor || "text-gray-900")}>{c.value}</p>
            <p className="text-sm text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">Entity Type</th>
                <th className="pb-3 font-medium">Entity ID</th>
                <th className="pb-3 font-medium">Changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLog.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{e.timestamp}</td>
                  <td className="py-3 text-gray-800">{e.user}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getActionColor(e.action))}>
                      {e.action}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{e.entityType}</td>
                  <td className="py-3 font-mono text-xs text-gray-600">{e.entityId}</td>
                  <td className="py-3 text-gray-600 text-xs max-w-xs truncate">{e.changes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">Records protected by database trigger &mdash; UPDATE and DELETE operations blocked</p>
        </div>
      </div>
    </div>
  );
}
