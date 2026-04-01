"use client";

import { Shield, Plus, Filter, AlertTriangle, CheckCircle2, Clock, FileWarning } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const capas = [
  { id: "CAPA-2026-041", title: "Biocompatibility test failure - Lot 2026-B12", type: "CORRECTIVE", status: "INVESTIGATING", priority: "CRITICAL", owner: "Sarah Chen", due: "Apr 8, 2026" },
  { id: "CAPA-2026-040", title: "Supplier material deviation - silicone grade", type: "PREVENTIVE", status: "ACTION_PLANNED", priority: "HIGH", owner: "James Kim", due: "Apr 15, 2026" },
  { id: "CAPA-2026-039", title: "Labeling error on IFU revision", type: "CORRECTIVE", status: "CLOSED", priority: "MEDIUM", owner: "Lisa Wang", due: "Mar 28, 2026" },
  { id: "CAPA-2026-038", title: "Sterilization cycle parameter drift", type: "BOTH", status: "EFFECTIVENESS_CHECK", priority: "HIGH", owner: "Dr. Patel", due: "Apr 20, 2026" },
  { id: "CAPA-2026-037", title: "Assembly fixture calibration gap", type: "PREVENTIVE", status: "ACTION_IMPLEMENTED", priority: "MEDIUM", owner: "Mike Johnson", due: "Apr 5, 2026" },
];

const auditSchedule = [
  { title: "Internal Audit - Production Floor", date: "Apr 5, 2026", type: "INTERNAL", status: "PLANNED" },
  { title: "FDA Inspection Readiness", date: "Apr 18, 2026", type: "REGULATORY", status: "PLANNED" },
  { title: "ISO 13485 Surveillance - TUV", date: "May 10, 2026", type: "CERTIFICATION", status: "PLANNED" },
];

const complaints = [
  { id: "CMP-2026-015", title: "Device malfunction during use", severity: "HIGH", reportable: true, status: "UNDER_INVESTIGATION" },
  { id: "CMP-2026-014", title: "Packaging seal integrity concern", severity: "MEDIUM", reportable: false, status: "RECEIVED" },
  { id: "CMP-2026-013", title: "Connector intermittent failure", severity: "HIGH", reportable: true, status: "DETERMINED_REPORTABLE" },
];

export default function QualityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-blue-600" />
            Quality Management
          </h1>
          <p className="text-sm text-muted-foreground">CAPAs, Audits, Complaints & Nonconformances — ISO 13485 Section 8</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New CAPA
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Open CAPAs", value: "12", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
          { label: "Closed This Month", value: "5", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Overdue Actions", value: "3", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Open Complaints", value: "7", icon: FileWarning, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={cn("rounded-lg p-2", s.bg)}>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CAPA Table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Active CAPAs</h2>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">CAPA #</th>
                <th className="p-3 font-medium">Title</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Priority</th>
                <th className="p-3 font-medium">Owner</th>
                <th className="p-3 font-medium">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {capas.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{c.id}</td>
                  <td className="p-3 text-sm">{c.title}</td>
                  <td className="p-3"><span className="text-xs">{c.type}</span></td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(c.status))}>{c.status.replace(/_/g, " ")}</span></td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(c.priority))}>{c.priority}</span></td>
                  <td className="p-3 text-sm text-muted-foreground">{c.owner}</td>
                  <td className="p-3 text-sm text-muted-foreground">{c.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Audit Schedule */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b p-4"><h2 className="font-semibold">Upcoming Audits</h2></div>
          <div className="divide-y">
            {auditSchedule.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.date} &middot; {a.type}</p>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(a.status))}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b p-4"><h2 className="font-semibold">Recent Complaints</h2></div>
          <div className="divide-y">
            {complaints.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">{c.id}: {c.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(c.severity))}>{c.severity}</span>
                    {c.reportable && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">MDR Reportable</span>}
                  </div>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(c.status))}>{c.status.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
