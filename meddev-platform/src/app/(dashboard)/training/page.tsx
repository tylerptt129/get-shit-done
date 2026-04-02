"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

const summaryCards = [
  { label: "Active Programs", value: 14, icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Total Trainees", value: 128, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Completed This Month", value: 32, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Overdue", value: 5, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

const programs = [
  { id: "TRN-001", name: "GMP Fundamentals", category: "Manufacturing", enrolled: 45, completed: 42, progress: 93, status: "active", dueDate: "Apr 15, 2026" },
  { id: "TRN-002", name: "CAPA Management", category: "Quality", enrolled: 22, completed: 18, progress: 82, status: "active", dueDate: "Apr 30, 2026" },
  { id: "TRN-003", name: "ISO 13485 Awareness", category: "Quality", enrolled: 65, completed: 60, progress: 92, status: "active", dueDate: "May 1, 2026" },
  { id: "TRN-004", name: "Sterile Processing Techniques", category: "Manufacturing", enrolled: 18, completed: 10, progress: 56, status: "active", dueDate: "Apr 20, 2026" },
  { id: "TRN-005", name: "21 CFR Part 11 Compliance", category: "Regulatory", enrolled: 30, completed: 28, progress: 93, status: "active", dueDate: "Apr 10, 2026" },
  { id: "TRN-006", name: "Risk Management (ISO 14971)", category: "Quality", enrolled: 25, completed: 12, progress: 48, status: "active", dueDate: "May 15, 2026" },
];

const overdueTraining = [
  { employee: "Robert Kim", department: "Manufacturing", program: "GMP Fundamentals", dueDate: "Mar 15, 2026", daysOverdue: 18 },
  { employee: "Patricia Gomez", department: "Quality Control", program: "CAPA Management", dueDate: "Mar 20, 2026", daysOverdue: 13 },
  { employee: "David Lee", department: "R&D", program: "ISO 13485 Awareness", dueDate: "Mar 22, 2026", daysOverdue: 11 },
  { employee: "Jennifer White", department: "Manufacturing", program: "Sterile Processing Techniques", dueDate: "Mar 25, 2026", daysOverdue: 8 },
  { employee: "Thomas Brown", department: "Quality", program: "21 CFR Part 11 Compliance", dueDate: "Mar 28, 2026", daysOverdue: 5 },
];

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-50 rounded-lg">
          <GraduationCap className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training</h1>
          <p className="text-sm text-gray-500">Training programs, compliance tracking, and certifications</p>
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

      {/* Training Programs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Programs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Program</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Enrolled</th>
                <th className="pb-3 font-medium">Completed</th>
                <th className="pb-3 font-medium">Progress</th>
                <th className="pb-3 font-medium">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-amber-600">{p.id}</td>
                  <td className="py-3 text-gray-800 font-medium">{p.name}</td>
                  <td className="py-3 text-gray-600">{p.category}</td>
                  <td className="py-3 text-gray-600 text-center">{p.enrolled}</td>
                  <td className="py-3 text-gray-600 text-center">{p.completed}</td>
                  <td className="py-3 w-36">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className={cn("h-2 rounded-full", p.progress >= 90 ? "bg-green-500" : p.progress >= 70 ? "bg-amber-500" : "bg-red-400")}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{p.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overdue Training */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" /> Overdue Training
        </h2>
        <div className="space-y-4">
          {overdueTraining.map((t) => (
            <div key={t.employee} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{t.employee}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.department} &middot; {t.program}</p>
                <p className="text-xs text-gray-400 mt-0.5">Due: {t.dueDate}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-800 whitespace-nowrap">
                {t.daysOverdue} days overdue
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
