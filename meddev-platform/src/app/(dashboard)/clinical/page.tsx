"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Stethoscope,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react";

const summaryCards = [
  { label: "Active Evaluations", value: 5, icon: Stethoscope, color: "text-red-600", bg: "bg-red-50" },
  { label: "Pending PMCF", value: 3, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Completed Studies", value: 8, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Adverse Events", value: 2, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
];

const evaluations = [
  { id: "CER-2026-001", product: "CardioSense Pro", type: "Clinical Evaluation Report", status: "in_progress", author: "Dr. Sarah Chen", dueDate: "Jun 30, 2026", lastUpdated: "Mar 28, 2026" },
  { id: "CER-2026-002", product: "OrthoFlex Implant v2", type: "Clinical Evaluation Report", status: "in_review", author: "Dr. Emily Watson", dueDate: "May 15, 2026", lastUpdated: "Mar 25, 2026" },
  { id: "PMCF-2026-001", product: "DermaScan Patch", type: "PMCF Plan", status: "approved", author: "Dr. Michael Ross", dueDate: "—", lastUpdated: "Feb 10, 2026" },
  { id: "PMCF-2026-002", product: "NeuroStim Controller", type: "PMCF Report", status: "in_progress", author: "Dr. Sarah Chen", dueDate: "Jul 15, 2026", lastUpdated: "Mar 30, 2026" },
  { id: "LIT-2026-001", product: "CardioSense Pro", type: "Literature Review", status: "completed", author: "Dr. Emily Watson", dueDate: "—", lastUpdated: "Mar 15, 2026" },
];

const milestones = [
  { id: 1, title: "CardioSense Pro CER — Submit to Notified Body", date: "Jun 30, 2026", status: "in_progress", daysRemaining: 89 },
  { id: 2, title: "OrthoFlex PMCF Study — Patient enrollment complete", date: "May 20, 2026", status: "in_progress", daysRemaining: 48 },
  { id: 3, title: "DermaScan Patch — Annual PMCF Update Report", date: "Aug 1, 2026", status: "planned", daysRemaining: 121 },
  { id: 4, title: "NeuroStim Controller — Clinical Investigation Protocol Final", date: "Apr 25, 2026", status: "in_progress", daysRemaining: 23 },
];

export default function ClinicalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 rounded-lg">
          <Stethoscope className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clinical</h1>
          <p className="text-sm text-gray-500">Clinical evaluations, PMCF, and post-market surveillance</p>
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

      {/* Clinical Evaluations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinical Evaluations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Author</th>
                <th className="pb-3 font-medium">Due Date</th>
                <th className="pb-3 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {evaluations.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-red-600">{e.id}</td>
                  <td className="py-3 text-gray-800">{e.product}</td>
                  <td className="py-3 text-gray-600">{e.type}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(e.status))}>
                      {e.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{e.author}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{e.dueDate}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{e.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-gray-400" /> Upcoming Milestones
        </h2>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{m.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.date} &middot; {m.daysRemaining} days remaining</p>
              </div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap", getStatusColor(m.status))}>
                {m.status.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
