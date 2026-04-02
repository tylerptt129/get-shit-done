"use client";

import { cn, getStatusColor } from "@/lib/utils";
import { SystemStatus } from "@/components/dashboard/system-status";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingDown,
  TrendingUp,
  Activity,
  ShieldAlert,
  CalendarClock,
} from "lucide-react";

const stats = [
  { label: "Open CAPAs", value: 12, trend: -2, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Pending Approvals", value: 8, trend: 3, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Overdue Items", value: 5, trend: 1, icon: ShieldAlert, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Active Submissions", value: 3, trend: 0, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
];

const recentActivity = [
  { id: 1, text: "CAPA-2026-041 escalated to High priority", time: "12 min ago", dot: "bg-red-500" },
  { id: 2, text: "SOP-QA-012 Rev 4 approved by Quality Director", time: "28 min ago", dot: "bg-green-500" },
  { id: 3, text: "NCR-2026-088 created for Lot B-2026-0315", time: "1 hr ago", dot: "bg-yellow-500" },
  { id: 4, text: "FDA 510(k) K263201 submission acknowledged", time: "2 hr ago", dot: "bg-blue-500" },
  { id: 5, text: "Supplier audit for MedTech Components completed", time: "3 hr ago", dot: "bg-purple-500" },
  { id: 6, text: "Training record updated for J. Martinez — GMP Module", time: "4 hr ago", dot: "bg-gray-500" },
];

const complianceMetrics = [
  { label: "CAPA On-Time Closure", value: 88, target: 95 },
  { label: "Document Review Cycle", value: 92, target: 90 },
  { label: "Training Compliance", value: 96, target: 95 },
  { label: "Supplier Qualification", value: 85, target: 90 },
  { label: "Complaint Processing", value: 91, target: 90 },
];

const riskOverview = [
  { level: "Unacceptable", count: 0, color: "bg-red-600" },
  { level: "High", count: 3, color: "bg-orange-500" },
  { level: "Medium", count: 8, color: "bg-yellow-500" },
  { level: "Low", count: 12, color: "bg-green-500" },
  { level: "Negligible", count: 5, color: "bg-gray-400" },
];

const upcomingTasks = [
  { id: 1, task: "Complete CAPA-2026-039 effectiveness check", due: "Apr 4, 2026", priority: "high", assignee: "Dr. Sarah Chen" },
  { id: 2, task: "Review DHF for OrthoFlex Implant v2.1", due: "Apr 5, 2026", priority: "medium", assignee: "Mark Thompson" },
  { id: 3, task: "Submit EU MDR Technical Documentation", due: "Apr 7, 2026", priority: "critical", assignee: "Lisa Park" },
  { id: 4, task: "Conduct internal audit — Sterilization Dept", due: "Apr 10, 2026", priority: "medium", assignee: "James Wilson" },
  { id: 5, task: "Approve revised labeling for CardioSense Pro", due: "Apr 12, 2026", priority: "low", assignee: "Amy Rodriguez" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">QMS Command Center</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time quality management overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg", s.bg)}>
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              {s.trend !== 0 && (
                <span className={cn("flex items-center text-xs font-medium", s.trend < 0 ? "text-green-600" : "text-red-600")}>
                  {s.trend < 0 ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                  {Math.abs(s.trend)}
                </span>
              )}
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-400" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <span className={cn("mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0", item.dot)} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Metrics</h2>
          <div className="space-y-4">
            {complianceMetrics.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{m.label}</span>
                  <span className={cn("font-medium", m.value >= m.target ? "text-green-600" : "text-red-600")}>
                    {m.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 relative">
                  <div
                    className={cn("h-2 rounded-full", m.value >= m.target ? "bg-green-500" : "bg-red-400")}
                    style={{ width: `${m.value}%` }}
                  />
                  <div
                    className="absolute top-0 h-2 w-0.5 bg-gray-800"
                    style={{ left: `${m.target}%` }}
                    title={`Target: ${m.target}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <SystemStatus />

        {/* Risk Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Overview</h2>
          <div className="space-y-3">
            {riskOverview.map((r) => (
              <div key={r.level} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={cn("h-3 w-3 rounded-full", r.color)} />
                  <span className="text-sm text-gray-700">{r.level}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{r.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Total active risks: {riskOverview.reduce((a, b) => a + b.count, 0)}</p>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-gray-400" /> Upcoming Tasks
          </h2>
          <div className="space-y-3">
            {upcomingTasks.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 truncate">{t.task}</p>
                  <p className="text-xs text-gray-400">{t.assignee} &middot; {t.due}</p>
                </div>
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap", getStatusColor(t.priority))}>
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
