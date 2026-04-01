"use client";

import {
  Shield,
  FileCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Open CAPAs",
    value: "12",
    change: "-2",
    trend: "down",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/quality",
  },
  {
    label: "Pending Approvals",
    value: "8",
    change: "+3",
    trend: "up",
    icon: FileCheck,
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "/documents",
  },
  {
    label: "Overdue Items",
    value: "5",
    change: "+1",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
    href: "/quality",
  },
  {
    label: "Active Submissions",
    value: "3",
    change: "0",
    trend: "neutral",
    icon: FileText,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/regulatory",
  },
];

const recentActivity = [
  {
    action: "CAPA-2026-039 closed",
    user: "Sarah Chen",
    time: "30 min ago",
    type: "success",
  },
  {
    action: "SOP-QA-015 submitted for review",
    user: "Mike Johnson",
    time: "1 hour ago",
    type: "info",
  },
  {
    action: "Supplier audit completed - TechMed Corp",
    user: "Lisa Wang",
    time: "2 hours ago",
    type: "success",
  },
  {
    action: "NCR-2026-087 escalated to CAPA",
    user: "James Kim",
    time: "3 hours ago",
    type: "warning",
  },
  {
    action: "Design review scheduled - CardioSense v2",
    user: "Dr. Patel",
    time: "4 hours ago",
    type: "info",
  },
  {
    action: "Training overdue: 3 employees",
    user: "HR System",
    time: "5 hours ago",
    type: "warning",
  },
];

const upcomingTasks = [
  {
    title: "Internal Audit - Production Floor",
    due: "Apr 5, 2026",
    priority: "HIGH",
    department: "Quality",
  },
  {
    title: "510(k) Submission - OrthoFlex",
    due: "Apr 10, 2026",
    priority: "CRITICAL",
    department: "Regulatory",
  },
  {
    title: "Design Review Gate 3 - NeuroStim",
    due: "Apr 12, 2026",
    priority: "HIGH",
    department: "Design",
  },
  {
    title: "Supplier Requalification - BioPlast Ltd",
    due: "Apr 15, 2026",
    priority: "MEDIUM",
    department: "Supply Chain",
  },
  {
    title: "Annual Management Review",
    due: "Apr 20, 2026",
    priority: "HIGH",
    department: "Quality",
  },
];

const complianceMetrics = [
  { label: "Document Control", score: 94, target: 95 },
  { label: "CAPA Effectiveness", score: 88, target: 90 },
  { label: "Training Compliance", score: 91, target: 95 },
  { label: "Supplier Quality", score: 96, target: 90 },
  { label: "Audit Readiness", score: 87, target: 90 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          QMS Command Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Medical Device Quality Management System — Real-time compliance
          overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={cn("rounded-lg p-2.5", stat.bg)}>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
                {stat.trend !== "neutral" && (
                  <span
                    className={cn(
                      "flex items-center text-xs font-medium",
                      stat.trend === "down"
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {stat.change}
                    {stat.trend === "down" ? (
                      <ArrowDownRight className="ml-0.5 h-3 w-3" />
                    ) : (
                      <ArrowUpRight className="ml-0.5 h-3 w-3" />
                    )}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Recent Activity</h2>
            </div>
            <button className="text-xs text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="divide-y">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 hover:bg-muted/30"
              >
                <div
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    item.type === "success" && "bg-green-500",
                    item.type === "info" && "bg-blue-500",
                    item.type === "warning" && "bg-amber-500"
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.user} &middot; {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Compliance Metrics</h2>
            </div>
          </div>
          <div className="space-y-4 p-4">
            {complianceMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-sm">
                  <span>{metric.label}</span>
                  <span
                    className={cn(
                      "font-medium",
                      metric.score >= metric.target
                        ? "text-green-600"
                        : "text-amber-600"
                    )}
                  >
                    {metric.score}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      metric.score >= metric.target
                        ? "bg-green-500"
                        : "bg-amber-500"
                    )}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Target: {metric.target}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Upcoming Tasks & Deadlines</h2>
          </div>
          <button className="text-xs text-primary hover:underline">
            View calendar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
                <th className="p-3 font-medium">Task</th>
                <th className="p-3 font-medium">Department</th>
                <th className="p-3 font-medium">Due Date</th>
                <th className="p-3 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {upcomingTasks.map((task, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="p-3 text-sm">{task.title}</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {task.department}
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {task.due}
                  </td>
                  <td className="p-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                        task.priority === "CRITICAL" &&
                          "bg-red-100 text-red-700",
                        task.priority === "HIGH" &&
                          "bg-orange-100 text-orange-700",
                        task.priority === "MEDIUM" &&
                          "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
