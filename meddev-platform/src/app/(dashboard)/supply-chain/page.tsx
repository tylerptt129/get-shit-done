"use client";

import { Truck, Star, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const suppliers = [
  { code: "SUP-001", name: "MedParts Inc.", type: "COMPONENT", status: "APPROVED", rating: 4.5, lastAudit: "Jan 2026", nextAudit: "Jul 2026" },
  { code: "SUP-002", name: "BioPlast Ltd.", type: "RAW_MATERIAL", status: "CONDITIONAL", rating: 3.2, lastAudit: "Sep 2025", nextAudit: "Apr 2026" },
  { code: "SUP-003", name: "TechMed Corp.", type: "CONTRACT_MANUFACTURER", status: "APPROVED", rating: 4.8, lastAudit: "Mar 2026", nextAudit: "Sep 2026" },
  { code: "SUP-004", name: "SterilPro Services", type: "STERILIZATION", status: "APPROVED", rating: 4.6, lastAudit: "Nov 2025", nextAudit: "May 2026" },
  { code: "SUP-005", name: "CalibTech", type: "CALIBRATION", status: "APPROVED", rating: 4.1, lastAudit: "Feb 2026", nextAudit: "Aug 2026" },
  { code: "SUP-006", name: "PackRight Co.", type: "PACKAGING", status: "PENDING", rating: null, lastAudit: "—", nextAudit: "Apr 2026" },
  { code: "SUP-007", name: "ChemSource Global", type: "RAW_MATERIAL", status: "DISQUALIFIED", rating: 2.1, lastAudit: "Dec 2025", nextAudit: "—" },
];

const supplierMetrics = [
  { label: "Approved Suppliers", value: "4", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Pending Qualification", value: "1", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Conditional", value: "1", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Avg Quality Rating", value: "4.2", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const upcomingAudits = [
  { supplier: "BioPlast Ltd.", date: "Apr 15, 2026", type: "Requalification", scope: "Material quality, process controls" },
  { supplier: "PackRight Co.", date: "Apr 22, 2026", type: "Initial Qualification", scope: "Facility, QMS, capabilities" },
  { supplier: "SterilPro Services", date: "May 8, 2026", type: "Surveillance", scope: "Sterilization validation, records" },
];

export default function SupplyChainPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Truck className="h-7 w-7 text-teal-600" />
          Supply Chain Management
        </h1>
        <p className="text-sm text-muted-foreground">Supplier Qualification, Audits & Material Management — ISO 13485 Section 7.4</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {supplierMetrics.map((s) => (
          <div key={s.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={cn("rounded-lg p-2", s.bg)}><s.icon className={cn("h-5 w-5", s.color)} /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Approved Supplier List</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">Code</th><th className="p-3 font-medium">Supplier</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Rating</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Last Audit</th><th className="p-3 font-medium">Next Audit</th>
            </tr></thead>
            <tbody className="divide-y">
              {suppliers.map((s) => (
                <tr key={s.code} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{s.code}</td>
                  <td className="p-3 text-sm">{s.name}</td>
                  <td className="p-3 text-xs">{s.type.replace(/_/g, " ")}</td>
                  <td className="p-3 text-sm">{s.rating ? `${s.rating}/5` : "—"}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium",
                    s.status === "APPROVED" ? "bg-green-100 text-green-700" :
                    s.status === "CONDITIONAL" ? "bg-amber-100 text-amber-700" :
                    s.status === "DISQUALIFIED" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-700"
                  )}>{s.status}</span></td>
                  <td className="p-3 text-sm text-muted-foreground">{s.lastAudit}</td>
                  <td className="p-3 text-sm text-muted-foreground">{s.nextAudit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Upcoming Supplier Audits</h2></div>
        <div className="divide-y">
          {upcomingAudits.map((a, i) => (
            <div key={i} className="p-4 hover:bg-muted/30">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{a.supplier}</p>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{a.type} &middot; {a.scope}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
