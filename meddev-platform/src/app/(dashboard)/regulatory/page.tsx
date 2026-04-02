"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  FileCheck,
  Globe,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const summaryCards = [
  { label: "Active Submissions", value: 3, icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Pending Reviews", value: 4, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Approved This Year", value: 2, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Action Required", value: 1, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

const submissions = [
  { id: "SUB-2026-001", product: "CardioSense Pro", type: "FDA 510(k)", reference: "K263201", status: "under_review", submitted: "Feb 15, 2026", target: "May 15, 2026" },
  { id: "SUB-2026-002", product: "OrthoFlex Implant v2", type: "CE Mark (MDR)", reference: "CE-2026-0045", status: "additional_info", submitted: "Jan 20, 2026", target: "Jun 30, 2026" },
  { id: "SUB-2026-003", product: "NeuroStim Controller", type: "FDA PMA Supplement", reference: "P260012/S004", status: "preparing", submitted: "—", target: "Jul 1, 2026" },
  { id: "SUB-2026-004", product: "DermaScan Patch", type: "FDA 510(k)", reference: "K262987", status: "approved", submitted: "Nov 10, 2025", target: "—" },
  { id: "SUB-2026-005", product: "CardioSense Pro", type: "Health Canada", reference: "HC-2026-1122", status: "submitted", submitted: "Mar 5, 2026", target: "Sep 5, 2026" },
];

const standards = [
  { standard: "ISO 13485:2016", scope: "Quality Management System", status: "active", lastAudit: "Oct 2025", nextAudit: "Oct 2026", certificate: "TUV-QMS-2025-4412" },
  { standard: "21 CFR Part 820", scope: "Quality System Regulation", status: "active", lastAudit: "Aug 2025", nextAudit: "Aug 2026", certificate: "FDA Est. 3012456" },
  { standard: "EU MDR 2017/745", scope: "Medical Device Regulation", status: "active", lastAudit: "Dec 2025", nextAudit: "Dec 2026", certificate: "NB-MDR-2025-0891" },
  { standard: "ISO 14971:2019", scope: "Risk Management", status: "active", lastAudit: "Oct 2025", nextAudit: "Oct 2026", certificate: "Integrated w/ QMS" },
  { standard: "IEC 62304:2015", scope: "Software Life Cycle", status: "active", lastAudit: "Oct 2025", nextAudit: "Oct 2026", certificate: "Integrated w/ QMS" },
  { standard: "IEC 60601-1:2020", scope: "Electrical Safety", status: "conditional", lastAudit: "Jun 2025", nextAudit: "Jun 2026", certificate: "TUV-ES-2025-2201" },
];

export default function RegulatoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-50 rounded-lg">
          <FileCheck className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regulatory Affairs</h1>
          <p className="text-sm text-gray-500">Submissions, standards compliance, and regulatory intelligence</p>
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

      {/* Regulatory Submissions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Submissions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Reference</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Submitted</th>
                <th className="pb-3 font-medium">Target Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-purple-600">{s.id}</td>
                  <td className="py-3 text-gray-800">{s.product}</td>
                  <td className="py-3 text-gray-600">{s.type}</td>
                  <td className="py-3 font-mono text-xs text-gray-600">{s.reference}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(s.status))}>
                      {s.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{s.submitted}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{s.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Standards & Compliance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Standards &amp; Compliance Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Standard</th>
                <th className="pb-3 font-medium">Scope</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Audit</th>
                <th className="pb-3 font-medium">Next Audit</th>
                <th className="pb-3 font-medium">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {standards.map((s) => (
                <tr key={s.standard} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900">{s.standard}</td>
                  <td className="py-3 text-gray-600">{s.scope}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(s.status))}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{s.lastAudit}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{s.nextAudit}</td>
                  <td className="py-3 font-mono text-xs text-gray-500">{s.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
