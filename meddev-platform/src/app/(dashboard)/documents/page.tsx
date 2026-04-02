"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  FileText,
  Clock,
  CheckCircle2,
  Archive,
  Files,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const summaryCards = [
  { label: "Total Documents", value: 247, icon: Files, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pending Review", value: 8, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Effective", value: 215, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Archived", value: 24, icon: Archive, color: "text-gray-600", bg: "bg-gray-50" },
];

const documents = [
  { id: "SOP-QA-012", title: "CAPA Management Procedure", version: "Rev 4", category: "Quality", status: "effective", owner: "Dr. Sarah Chen", effective: "Mar 15, 2026" },
  { id: "SOP-MFG-008", title: "Sterilization Process Validation", version: "Rev 3", category: "Manufacturing", status: "effective", owner: "James Wilson", effective: "Feb 1, 2026" },
  { id: "WI-QC-045", title: "Incoming Inspection — Raw Materials", version: "Rev 2", category: "Quality Control", status: "in_review", owner: "Mark Thompson", effective: "—" },
  { id: "SOP-RA-003", title: "Regulatory Submission Procedure", version: "Rev 5", category: "Regulatory", status: "effective", owner: "Lisa Park", effective: "Jan 10, 2026" },
  { id: "FORM-QA-112", title: "Nonconformance Report Template", version: "Rev 6", category: "Quality", status: "effective", owner: "Amy Rodriguez", effective: "Mar 20, 2026" },
  { id: "SOP-DES-007", title: "Design Review Protocol", version: "Rev 3", category: "Design", status: "draft", owner: "Dr. Sarah Chen", effective: "—" },
  { id: "WI-MFG-022", title: "Equipment Calibration — CMM", version: "Rev 1", category: "Manufacturing", status: "in_review", owner: "James Wilson", effective: "—" },
];

const pendingApprovals = [
  { id: "SOP-QA-015", title: "Complaint Handling Procedure — Rev 3", requestedBy: "Dr. Sarah Chen", date: "Mar 28, 2026", type: "Major Revision" },
  { id: "WI-QC-045", title: "Incoming Inspection — Raw Materials — Rev 2", requestedBy: "Mark Thompson", date: "Mar 30, 2026", type: "Minor Revision" },
  { id: "FORM-TR-008", title: "Training Effectiveness Evaluation — Rev 4", requestedBy: "Amy Rodriguez", date: "Apr 1, 2026", type: "Administrative" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <FileText className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Control</h1>
          <p className="text-sm text-gray-500">Controlled documents, versioning, and approvals</p>
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

      {/* Document Register */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Register</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Doc ID</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Version</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Owner</th>
                <th className="pb-3 font-medium">Effective Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-emerald-600">{d.id}</td>
                  <td className="py-3 text-gray-800">{d.title}</td>
                  <td className="py-3 font-mono text-xs text-gray-600">{d.version}</td>
                  <td className="py-3 text-gray-600">{d.category}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(d.status))}>
                      {d.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{d.owner}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{d.effective}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-400" /> Pending Approvals
        </h2>
        <div className="space-y-4">
          {pendingApprovals.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-600">{a.id}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">{a.type}</span>
                </div>
                <p className="text-sm text-gray-800 mt-1">{a.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">Requested by {a.requestedBy} &middot; {a.date}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" /> Approve
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors">
                  <ThumbsDown className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
