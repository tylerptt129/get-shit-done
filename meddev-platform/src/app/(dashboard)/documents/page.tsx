"use client";

import { FileText, Plus, Search, Filter, Clock, CheckCircle2, FileEdit, Archive } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const documents = [
  { id: "SOP-QA-015", title: "Corrective and Preventive Action Procedure", type: "SOP", status: "IN_REVIEW", version: "3.1", owner: "Sarah Chen", effective: "—", reviewDate: "Apr 10, 2026" },
  { id: "SOP-QA-012", title: "Internal Audit Procedure", type: "SOP", status: "EFFECTIVE", version: "2.0", owner: "Mike Johnson", effective: "Jan 15, 2026", reviewDate: "Jan 15, 2027" },
  { id: "WI-PRD-008", title: "Assembly Work Instruction - CardioSense", type: "WORK_INSTRUCTION", status: "EFFECTIVE", version: "1.4", owner: "Lisa Wang", effective: "Mar 1, 2026", reviewDate: "Mar 1, 2027" },
  { id: "FRM-QA-021", title: "CAPA Investigation Form", type: "FORM", status: "APPROVED", version: "2.1", owner: "James Kim", effective: "Apr 1, 2026", reviewDate: "Apr 1, 2027" },
  { id: "POL-QMS-001", title: "Quality Policy", type: "POLICY", status: "EFFECTIVE", version: "5.0", owner: "Dr. Patel", effective: "Jan 1, 2026", reviewDate: "Jan 1, 2027" },
  { id: "SPC-DE-003", title: "CardioSense v2 Product Specification", type: "SPECIFICATION", status: "DRAFT", version: "0.3", owner: "Dr. Kim", effective: "—", reviewDate: "—" },
  { id: "RPT-VA-001", title: "OrthoFlex Biocompatibility Report", type: "REPORT", status: "IN_REVIEW", version: "1.0", owner: "Lab Services", effective: "—", reviewDate: "Apr 5, 2026" },
];

const pendingApprovals = [
  { doc: "SOP-QA-015", title: "CAPA Procedure v3.1", requester: "Sarah Chen", submitted: "Mar 29, 2026" },
  { doc: "RPT-VA-001", title: "Biocompatibility Report", requester: "Lab Services", submitted: "Mar 28, 2026" },
  { doc: "FRM-QA-021", title: "CAPA Investigation Form v2.1", requester: "James Kim", submitted: "Mar 27, 2026" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-7 w-7 text-emerald-600" />
            Document Control
          </h1>
          <p className="text-sm text-muted-foreground">SOPs, Work Instructions, Forms & Controlled Documents — ISO 13485 Section 4.2</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New Document
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Documents", value: "247", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Review", value: "8", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Effective", value: "215", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Archived", value: "24", icon: Archive, color: "text-gray-600", bg: "bg-gray-50" },
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
        <div className="border-b p-4"><h2 className="font-semibold">Document Register</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">Doc #</th><th className="p-3 font-medium">Title</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Version</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Effective</th><th className="p-3 font-medium">Review Date</th>
            </tr></thead>
            <tbody className="divide-y">
              {documents.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{d.id}</td>
                  <td className="p-3 text-sm">{d.title}</td>
                  <td className="p-3 text-xs">{d.type.replace(/_/g, " ")}</td>
                  <td className="p-3 text-sm font-mono">{d.version}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(d.status))}>{d.status.replace(/_/g, " ")}</span></td>
                  <td className="p-3 text-sm text-muted-foreground">{d.effective}</td>
                  <td className="p-3 text-sm text-muted-foreground">{d.reviewDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Pending Approvals</h2></div>
        <div className="divide-y">
          {pendingApprovals.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30">
              <div>
                <p className="text-sm"><span className="font-medium text-primary">{a.doc}</span>: {a.title}</p>
                <p className="text-xs text-muted-foreground">Submitted by {a.requester} on {a.submitted}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200">Approve</button>
                <button className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
