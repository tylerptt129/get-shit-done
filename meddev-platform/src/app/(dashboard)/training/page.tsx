"use client";

import { GraduationCap, Users, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const trainings = [
  { id: "TRN-001", title: "GMP Fundamentals", type: "GMP_TRAINING", department: "All", assigned: 45, completed: 42, overdue: 3, deadline: "Apr 15, 2026" },
  { id: "TRN-002", title: "SOP-QA-015: CAPA Procedure v3.1", type: "SOP_TRAINING", department: "Quality", assigned: 12, completed: 0, overdue: 0, deadline: "Apr 20, 2026" },
  { id: "TRN-003", title: "ISO 13485 Awareness", type: "REGULATORY", department: "All", assigned: 45, completed: 45, overdue: 0, deadline: "Mar 30, 2026" },
  { id: "TRN-004", title: "Clean Room Gowning", type: "COMPETENCY", department: "Production", assigned: 18, completed: 16, overdue: 2, deadline: "Apr 5, 2026" },
  { id: "TRN-005", title: "New Employee Onboarding Q2", type: "ONBOARDING", department: "All", assigned: 5, completed: 2, overdue: 0, deadline: "Apr 30, 2026" },
  { id: "TRN-006", title: "Equipment Operation - Assembly Line 3", type: "EQUIPMENT", department: "Production", assigned: 8, completed: 8, overdue: 0, deadline: "Mar 25, 2026" },
];

const overdueEmployees = [
  { name: "Tom Wilson", training: "GMP Fundamentals", department: "Production", dueDate: "Mar 15, 2026", daysOverdue: 17 },
  { name: "Amy Park", training: "GMP Fundamentals", department: "Warehouse", dueDate: "Mar 15, 2026", daysOverdue: 17 },
  { name: "David Lee", training: "Clean Room Gowning", department: "Production", dueDate: "Mar 28, 2026", daysOverdue: 4 },
  { name: "Rachel Torres", training: "GMP Fundamentals", department: "Quality", dueDate: "Mar 15, 2026", daysOverdue: 17 },
  { name: "Kevin Nguyen", training: "Clean Room Gowning", department: "Production", dueDate: "Mar 28, 2026", daysOverdue: 4 },
];

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-amber-600" />
          Training Management
        </h1>
        <p className="text-sm text-muted-foreground">Training Records, Competency & Compliance — ISO 13485 Section 6.2</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Active Trainings", value: "6", icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Assigned", value: "133", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Completed", value: "113", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Overdue", value: "5", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={cn("rounded-lg p-2", s.bg)}><s.icon className={cn("h-5 w-5", s.color)} /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Training Programs</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">ID</th><th className="p-3 font-medium">Title</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Department</th><th className="p-3 font-medium">Progress</th><th className="p-3 font-medium">Deadline</th>
            </tr></thead>
            <tbody className="divide-y">
              {trainings.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{t.id}</td>
                  <td className="p-3 text-sm">{t.title}</td>
                  <td className="p-3 text-xs">{t.type.replace(/_/g, " ")}</td>
                  <td className="p-3 text-sm text-muted-foreground">{t.department}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div className={cn("h-2 rounded-full", t.completed === t.assigned ? "bg-green-500" : t.overdue > 0 ? "bg-amber-500" : "bg-blue-500")} style={{ width: `${(t.completed / t.assigned) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{t.completed}/{t.assigned}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4">
          <h2 className="font-semibold text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Overdue Training
          </h2>
        </div>
        <div className="divide-y">
          {overdueEmployees.map((e, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium">{e.name}</p>
                <p className="text-xs text-muted-foreground">{e.training} &middot; {e.department}</p>
              </div>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">{e.daysOverdue} days overdue</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
