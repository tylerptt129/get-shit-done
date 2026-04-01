"use client";

import { Stethoscope, FileText, Users, Activity, Clock } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const evaluations = [
  { id: "CER-001", title: "CardioSense v2 Clinical Evaluation", type: "CLINICAL_INVESTIGATION", status: "ACTIVE", subjects: 120, start: "Jan 2026", end: "Jul 2026" },
  { id: "CER-002", title: "OrthoFlex Literature Review", type: "LITERATURE_REVIEW", status: "COMPLETE", subjects: null, start: "Oct 2025", end: "Feb 2026" },
  { id: "CER-003", title: "NeuroStim Equivalence Study", type: "EQUIVALENCE", status: "PLANNING", subjects: null, start: "May 2026", end: "—" },
  { id: "CER-004", title: "DermaScan Post-Market Clinical Follow-up", type: "POST_MARKET_CLINICAL", status: "ACTIVE", subjects: 500, start: "Mar 2025", end: "Mar 2027" },
  { id: "CER-005", title: "CardioSense Registry Study", type: "REGISTRY_STUDY", status: "ENROLLING", subjects: 45, start: "Feb 2026", end: "Feb 2028" },
];

const milestones = [
  { evaluation: "CER-001", milestone: "Interim analysis (50% enrollment)", date: "Apr 15, 2026", status: "PENDING" },
  { evaluation: "CER-003", milestone: "Protocol finalization", date: "Apr 20, 2026", status: "IN_PROGRESS" },
  { evaluation: "CER-004", milestone: "Annual PMCF report", date: "Mar 2026", status: "COMPLETED" },
  { evaluation: "CER-005", milestone: "Site initiation visit #3", date: "Apr 8, 2026", status: "PENDING" },
];

export default function ClinicalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-red-600" />
          Clinical Affairs
        </h1>
        <p className="text-sm text-muted-foreground">Clinical Evaluations, Investigations & Post-Market Surveillance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Active Studies", value: "3", icon: Activity, color: "text-red-600", bg: "bg-red-50" },
          { label: "Total Subjects", value: "665", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Milestones", value: "4", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Reports Due", value: "1", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
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
        <div className="border-b p-4"><h2 className="font-semibold">Clinical Evaluations</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">ID</th><th className="p-3 font-medium">Title</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Subjects</th><th className="p-3 font-medium">Timeline</th><th className="p-3 font-medium">Status</th>
            </tr></thead>
            <tbody className="divide-y">
              {evaluations.map((e) => (
                <tr key={e.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{e.id}</td>
                  <td className="p-3 text-sm">{e.title}</td>
                  <td className="p-3 text-xs">{e.type.replace(/_/g, " ")}</td>
                  <td className="p-3 text-sm">{e.subjects ?? "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{e.start} — {e.end}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(e.status))}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Upcoming Milestones</h2></div>
        <div className="divide-y">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium">{m.milestone}</p>
                <p className="text-xs text-muted-foreground">{m.evaluation} &middot; {m.date}</p>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(m.status))}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
