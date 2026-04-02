"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquareWarning,
  CalendarCheck,
  FileWarning,
} from "lucide-react";

const summaryCards = [
  { label: "Open CAPAs", value: 12, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Closed This Month", value: 5, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Overdue Actions", value: 3, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Open Complaints", value: 7, icon: MessageSquareWarning, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const capas = [
  { id: "CAPA-2026-041", title: "Sterility assurance failure — Lot B-0315", type: "Corrective", status: "investigating", priority: "high", owner: "Dr. Sarah Chen", due: "Apr 15, 2026" },
  { id: "CAPA-2026-040", title: "Label misprint on CardioSense Pro packaging", type: "Corrective", status: "action_planned", priority: "medium", owner: "Amy Rodriguez", due: "Apr 20, 2026" },
  { id: "CAPA-2026-039", title: "OrthoFlex fatigue test deviation", type: "Preventive", status: "effectiveness_check", priority: "high", owner: "Mark Thompson", due: "Apr 4, 2026" },
  { id: "CAPA-2026-038", title: "Supplier nonconformance — raw material spec", type: "Corrective", status: "action_implemented", priority: "medium", owner: "James Wilson", due: "Apr 25, 2026" },
  { id: "CAPA-2026-037", title: "Software validation gap in NeuroStim firmware", type: "Preventive", status: "investigating", priority: "critical", owner: "Lisa Park", due: "Apr 8, 2026" },
];

const upcomingAudits = [
  { id: 1, name: "Internal Audit — Sterilization Department", date: "Apr 10, 2026", auditor: "James Wilson", type: "Internal" },
  { id: 2, name: "Notified Body Surveillance Audit", date: "May 3, 2026", auditor: "TUV SUD", type: "External" },
  { id: 3, name: "Supplier Audit — MedTech Components Ltd", date: "May 15, 2026", auditor: "Dr. Sarah Chen", type: "Supplier" },
];

const recentComplaints = [
  { id: "CMP-2026-112", title: "Patient reported skin irritation — DermaScan Patch", date: "Mar 30, 2026", mdr: true, status: "open" },
  { id: "CMP-2026-111", title: "Device malfunction during calibration — CardioSense", date: "Mar 28, 2026", mdr: true, status: "investigating" },
  { id: "CMP-2026-110", title: "Packaging damage during shipping — OrthoFlex Kit", date: "Mar 25, 2026", mdr: false, status: "in_progress" },
];

export default function QualityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quality Management</h1>
          <p className="text-sm text-gray-500">CAPAs, audits, complaints, and quality events</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className={cn("p-2 rounded-lg w-fit", c.bg)}>
              <c.icon className={cn("h-5 w-5", c.color)} />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">{c.value}</p>
            <p className="text-sm text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Active CAPAs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active CAPAs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Owner</th>
                <th className="pb-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {capas.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-blue-600">{c.id}</td>
                  <td className="py-3 text-gray-800 max-w-xs truncate">{c.title}</td>
                  <td className="py-3 text-gray-600">{c.type}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(c.status))}>
                      {c.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(c.priority))}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{c.owner}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{c.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Audits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-gray-400" /> Upcoming Audits
          </h2>
          <div className="space-y-4">
            {upcomingAudits.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.auditor} &middot; {a.date}</p>
                </div>
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(a.type === "External" ? "high" : a.type === "Supplier" ? "medium" : "low"))}>
                  {a.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-gray-400" /> Recent Complaints
          </h2>
          <div className="space-y-4">
            {recentComplaints.map((c) => (
              <div key={c.id} className="pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-blue-600">{c.id}</span>
                      {c.mdr && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-medium">MDR Reportable</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-800 mt-1">{c.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.date}</p>
                  </div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap", getStatusColor(c.status))}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
