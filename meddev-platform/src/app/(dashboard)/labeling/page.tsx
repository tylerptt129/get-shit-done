"use client";

import { Tag, Plus, QrCode, FileText, CheckCircle2 } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const labels = [
  { id: "LBL-001", product: "CardioSense Monitor", type: "DEVICE_LABEL", version: "2.1", status: "APPROVED", udi: "00850123456789", lot: "CS-2026-B12" },
  { id: "LBL-002", product: "CardioSense Monitor", type: "IFU", version: "2.1", status: "IN_REVIEW", udi: "00850123456789", lot: "—" },
  { id: "LBL-003", product: "OrthoFlex Implant", type: "DEVICE_LABEL", version: "1.0", status: "DRAFT", udi: "00850123456790", lot: "—" },
  { id: "LBL-004", product: "DermaScan Pro", type: "OUTER_PACKAGING", version: "1.3", status: "APPROVED", udi: "00850123456791", lot: "DS-2026-B08" },
  { id: "LBL-005", product: "NeuroStim Pulse", type: "UDI_LABEL", version: "1.0", status: "APPROVED", udi: "00850123456792", lot: "NS-2026-B06" },
  { id: "LBL-006", product: "DermaScan Pro", type: "IFU", version: "3.0", status: "EFFECTIVE", udi: "00850123456791", lot: "—" },
];

const udiCompliance = [
  { product: "CardioSense Monitor", gudid: "Registered", issuing: "GS1", diStatus: "Active", piStatus: "Active" },
  { product: "OrthoFlex Implant", gudid: "Pending", issuing: "GS1", diStatus: "Pending", piStatus: "Not Started" },
  { product: "DermaScan Pro", gudid: "Registered", issuing: "GS1", diStatus: "Active", piStatus: "Active" },
  { product: "NeuroStim Pulse", gudid: "Registered", issuing: "GS1", diStatus: "Active", piStatus: "Active" },
];

export default function LabelingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="h-7 w-7 text-pink-600" />
            Labeling Management
          </h1>
          <p className="text-sm text-muted-foreground">UDI, IFU, Device Labels & Packaging — 21 CFR 801 / MDR Annex I</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New Label
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Labels", value: "32", icon: Tag, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "UDI Registered", value: "3/4", icon: QrCode, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "IFUs Current", value: "8", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Approved", value: "24", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
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
        <div className="border-b p-4"><h2 className="font-semibold">Label Register</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">ID</th><th className="p-3 font-medium">Product</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Version</th><th className="p-3 font-medium">UDI-DI</th><th className="p-3 font-medium">Status</th>
            </tr></thead>
            <tbody className="divide-y">
              {labels.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{l.id}</td>
                  <td className="p-3 text-sm">{l.product}</td>
                  <td className="p-3 text-xs">{l.type.replace(/_/g, " ")}</td>
                  <td className="p-3 text-sm font-mono">{l.version}</td>
                  <td className="p-3 text-xs font-mono text-muted-foreground">{l.udi}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(l.status))}>{l.status.replace(/_/g, " ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">UDI Compliance Status</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">Product</th><th className="p-3 font-medium">GUDID</th><th className="p-3 font-medium">Issuing Agency</th><th className="p-3 font-medium">DI Status</th><th className="p-3 font-medium">PI Status</th>
            </tr></thead>
            <tbody className="divide-y">
              {udiCompliance.map((u, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium">{u.product}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", u.gudid === "Registered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>{u.gudid}</span></td>
                  <td className="p-3 text-sm">{u.issuing}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", u.diStatus === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>{u.diStatus}</span></td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", u.piStatus === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>{u.piStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
