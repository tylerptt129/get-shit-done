"use client";

import { Ruler, GitBranch, CheckSquare, AlertTriangle } from "lucide-react";
import { cn, getStatusColor } from "@/lib/utils";

const products = [
  { name: "CardioSense Monitor v2", code: "CS-200", class: "Class II", phase: "VALIDATION", progress: 78 },
  { name: "OrthoFlex Implant", code: "OF-100", class: "Class III", phase: "DESIGN_OUTPUT", progress: 55 },
  { name: "NeuroStim Pulse Gen", code: "NS-300", class: "Class III", phase: "VERIFICATION", progress: 65 },
  { name: "DermaScan Pro v3", code: "DS-150", class: "Class II", phase: "TRANSFER", progress: 92 },
];

const designReviews = [
  { product: "CardioSense v2", phase: "Validation Review", date: "Apr 12, 2026", status: "SCHEDULED", reviewer: "Dr. Patel" },
  { product: "OrthoFlex", phase: "Design Output Review", date: "Apr 18, 2026", status: "SCHEDULED", reviewer: "Sarah Chen" },
  { product: "NeuroStim", phase: "Verification Review", date: "Apr 25, 2026", status: "SCHEDULED", reviewer: "Dr. Kim" },
];

const traceability = [
  { input: "User need: Continuous monitoring", output: "Spec: 72hr battery life", status: "VERIFIED", product: "CardioSense" },
  { input: "Regulatory: Biocompatibility", output: "Test protocol TP-042", status: "IN_PROGRESS", product: "OrthoFlex" },
  { input: "Safety: Thermal limits", output: "Spec: Max 41°C surface temp", status: "VERIFIED", product: "NeuroStim" },
  { input: "Performance: Signal accuracy", output: "Spec: ±2% measurement", status: "VALIDATED", product: "CardioSense" },
];

export default function DesignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Ruler className="h-7 w-7 text-indigo-600" />
          Design Controls
        </h1>
        <p className="text-sm text-muted-foreground">Design Inputs, Outputs, Reviews & Traceability — ISO 13485 Section 7.3</p>
      </div>

      {/* Product Design Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <div key={p.code} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.code} &middot; {p.class}</p>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(p.phase))}>{p.phase.replace(/_/g, " ")}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Design Progress</span><span>{p.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-indigo-500 transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Design Reviews */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4"><h2 className="font-semibold">Upcoming Design Reviews</h2></div>
        <div className="divide-y">
          {designReviews.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium">{r.product} — {r.phase}</p>
                <p className="text-xs text-muted-foreground">{r.date} &middot; Reviewer: {r.reviewer}</p>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(r.status))}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traceability Matrix */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="flex items-center gap-2"><GitBranch className="h-4 w-4 text-muted-foreground" /><h2 className="font-semibold">Design Traceability Matrix</h2></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-muted/30 text-left text-xs text-muted-foreground">
              <th className="p-3 font-medium">Product</th><th className="p-3 font-medium">Design Input</th><th className="p-3 font-medium">Design Output</th><th className="p-3 font-medium">Status</th>
            </tr></thead>
            <tbody className="divide-y">
              {traceability.map((t, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="p-3 text-sm font-medium">{t.product}</td>
                  <td className="p-3 text-sm">{t.input}</td>
                  <td className="p-3 text-sm">{t.output}</td>
                  <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", getStatusColor(t.status))}>{t.status.replace(/_/g, " ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
