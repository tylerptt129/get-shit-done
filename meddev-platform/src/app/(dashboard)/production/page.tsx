"use client";

import { Factory, AlertTriangle, CheckCircle2, Package, Gauge } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const batchRecords = [
  { id: "BR-2026-045", product: "CardioSense Monitor", lot: "CS-2026-B12", qty: 500, status: "IN_PROGRESS", yield: "97.2%", date: "Mar 30, 2026" },
  { id: "BR-2026-044", product: "DermaScan Pro", lot: "DS-2026-B08", qty: 1000, status: "COMPLETED", yield: "99.1%", date: "Mar 28, 2026" },
  { id: "BR-2026-043", product: "OrthoFlex Implant", lot: "OF-2026-B03", qty: 200, status: "COMPLETED", yield: "98.5%", date: "Mar 25, 2026" },
  { id: "BR-2026-042", product: "NeuroStim Pulse", lot: "NS-2026-B06", qty: 150, status: "IN_PROGRESS", yield: "—", date: "Mar 31, 2026" },
];

const ncrs = [
  { id: "NCR-2026-087", title: "Dimensional out-of-spec on housing", type: "IN_PROCESS", status: "UNDER_REVIEW", severity: "MAJOR" },
  { id: "NCR-2026-086", title: "Incoming material cert missing", type: "INCOMING_MATERIAL", status: "QUARANTINED", severity: "MINOR" },
  { id: "NCR-2026-085", title: "Label misprint on lot CS-2026-B11", type: "FINISHED_PRODUCT", status: "DISPOSITIONED", severity: "MINOR" },
];

const metrics = [
  { label: "First Pass Yield", value: "97.8%", target: "95%", status: "good" },
  { label: "OEE", value: "84.2%", target: "85%", status: "warning" },
  { label: "Scrap Rate", value: "1.3%", target: "<2%", status: "good" },
  { label: "On-Time Delivery", value: "96.5%", target: "95%", status: "good" },
];

export default function ProductionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Factory className="h-7 w-7 text-orange-600" />
          Production & Manufacturing
        </h1>
        <p className="text-sm text-muted-foreground">Batch Records, NCRs & Manufacturing Metrics — ISO 13485 Section 7.5</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className={cn("text-2xl font-bold mt-1", m.status === "good" ? "text-green-600" : "text-amber-600")}>{m.value}</p>
            <p className="text-[10px] text-muted-foreground">Target: {m.target}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Batch Records</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">Batch #</th><th className="p-3 font-medium">Product</th><th className="p-3 font-medium">Lot</th><th className="p-3 font-medium">Qty</th><th className="p-3 font-medium">Yield</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Date</th>
            </tr></thead>
            <tbody className="divide-y">
              {batchRecords.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium text-primary">{b.id}</td>
                  <td className="p-3 text-sm">{b.product}</td>
                  <td className="p-3 text-sm font-mono text-xs">{b.lot}</td>
                  <td className="p-3 text-sm">{b.qty}</td>
                  <td className="p-3 text-sm">{b.yield}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(b.status))}>{b.status.replace(/_/g, " ")}</span></td>
                  <td className="p-3 text-sm text-muted-foreground">{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Nonconformance Reports</h2></div>
        <div className="divide-y">
          {ncrs.map((n) => (
            <div key={n.id} className="flex items-center justify-between p-4 hover:bg-muted/30">
              <div>
                <p className="text-sm"><span className="font-medium text-primary">{n.id}</span>: {n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.type.replace(/_/g, " ")} &middot; {n.severity}</p>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(n.status))}>{n.status.replace(/_/g, " ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
