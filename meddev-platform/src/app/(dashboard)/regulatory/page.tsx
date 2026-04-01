"use client";

import { FileCheck, Globe, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const submissions = [
  { id: "SUB-001", product: "CardioSense Monitor", type: "FDA 510(k)", market: "US", status: "UNDER_REVIEW", submitted: "Feb 15, 2026", body: "FDA" },
  { id: "SUB-002", product: "OrthoFlex Implant", type: "CE Mark (MDR)", market: "EU", status: "PREPARING", submitted: "—", body: "Notified Body" },
  { id: "SUB-003", product: "NeuroStim Pulse", type: "FDA De Novo", market: "US", status: "ADDITIONAL_INFO", submitted: "Jan 10, 2026", body: "FDA" },
  { id: "SUB-004", product: "CardioSense Monitor", type: "Health Canada", market: "CA", status: "APPROVED", submitted: "Nov 5, 2025", body: "Health Canada" },
  { id: "SUB-005", product: "DermaScan Pro", type: "FDA 510(k)", market: "US", status: "APPROVED", submitted: "Oct 20, 2025", body: "FDA" },
];

const complianceItems = [
  { standard: "ISO 13485:2016", status: "Certified", expiry: "Aug 2027", action: "Surveillance audit May 2026" },
  { standard: "21 CFR 820", status: "Compliant", expiry: "—", action: "FDA inspection readiness review" },
  { standard: "EU MDR 2017/745", status: "In Progress", expiry: "—", action: "Technical documentation update" },
  { standard: "ISO 14971:2019", status: "Compliant", expiry: "—", action: "Risk management file review Q2" },
  { standard: "IEC 62304", status: "Compliant", expiry: "—", action: "Software lifecycle maintenance" },
];

export default function RegulatoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileCheck className="h-7 w-7 text-purple-600" />
          Regulatory Affairs
        </h1>
        <p className="text-sm text-muted-foreground">Submissions, Compliance Tracking & Market Authorizations</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Active Submissions", value: "3", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Pending Response", value: "1", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Approved (YTD)", value: "2", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Action Required", value: "1", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
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
        <div className="border-b p-4"><h2 className="font-semibold">Regulatory Submissions</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">ID</th><th className="p-3 font-medium">Product</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Market</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Submitted</th>
            </tr></thead>
            <tbody className="divide-y">
              {submissions.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{s.id}</td>
                  <td className="p-3 text-sm">{s.product}</td>
                  <td className="p-3 text-sm">{s.type}</td>
                  <td className="p-3 text-sm">{s.market}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(s.status))}>{s.status.replace(/_/g, " ")}</span></td>
                  <td className="p-3 text-sm text-muted-foreground">{s.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Standards & Compliance Status</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">Standard</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Expiry</th><th className="p-3 font-medium">Next Action</th>
            </tr></thead>
            <tbody className="divide-y">
              {complianceItems.map((c, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium">{c.standard}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", c.status === "Certified" || c.status === "Compliant" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>{c.status}</span></td>
                  <td className="p-3 text-sm text-muted-foreground">{c.expiry}</td>
                  <td className="p-3 text-sm text-muted-foreground">{c.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
