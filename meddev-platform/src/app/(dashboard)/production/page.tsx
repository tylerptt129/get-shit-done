"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Factory,
  TrendingUp,
  Target,
  Trash2,
  Truck,
  AlertCircle,
} from "lucide-react";

const metrics = [
  { label: "First Pass Yield", value: "97.8%", icon: Target, color: "text-green-600", bg: "bg-green-50", trend: "+0.3%" },
  { label: "OEE", value: "84.2%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", trend: "+1.1%" },
  { label: "Scrap Rate", value: "1.3%", icon: Trash2, color: "text-orange-600", bg: "bg-orange-50", trend: "-0.2%" },
  { label: "On-Time Delivery", value: "96.5%", icon: Truck, color: "text-purple-600", bg: "bg-purple-50", trend: "+0.5%" },
];

const batchRecords = [
  { id: "BR-2026-0421", product: "CardioSense Pro", lot: "LOT-CS-2026-0315", quantity: 500, yield: "98.2%", status: "completed", date: "Mar 28, 2026" },
  { id: "BR-2026-0420", product: "OrthoFlex Implant", lot: "LOT-OF-2026-0112", quantity: 200, yield: "97.5%", status: "in_progress", date: "Mar 30, 2026" },
  { id: "BR-2026-0419", product: "DermaScan Patch", lot: "LOT-DS-2026-0287", quantity: 1000, yield: "99.1%", status: "completed", date: "Mar 25, 2026" },
  { id: "BR-2026-0418", product: "NeuroStim Controller", lot: "LOT-NS-2026-0088", quantity: 150, yield: "96.0%", status: "in_review", date: "Mar 22, 2026" },
];

const ncrs = [
  { id: "NCR-2026-088", title: "Dimensional out-of-spec — OrthoFlex housing", lot: "LOT-OF-2026-0112", severity: "medium", disposition: "Use As Is", date: "Mar 30, 2026" },
  { id: "NCR-2026-087", title: "Sterility indicator failure — CardioSense lot", lot: "LOT-CS-2026-0310", severity: "high", disposition: "Reject / Scrap", date: "Mar 27, 2026" },
  { id: "NCR-2026-086", title: "Label adhesion below specification — DermaScan", lot: "LOT-DS-2026-0280", severity: "low", disposition: "Rework", date: "Mar 24, 2026" },
];

export default function ProductionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-50 rounded-lg">
          <Factory className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Production</h1>
          <p className="text-sm text-gray-500">Manufacturing metrics, batch records, and nonconformances</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg", m.bg)}>
                <m.icon className={cn("h-5 w-5", m.color)} />
              </div>
              <span className={cn("text-xs font-medium", m.trend.startsWith("+") ? "text-green-600" : "text-green-600")}>
                {m.trend}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-sm text-gray-500">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Batch Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Batch Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Batch ID</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Lot</th>
                <th className="pb-3 font-medium">Quantity</th>
                <th className="pb-3 font-medium">Yield</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batchRecords.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-orange-600">{b.id}</td>
                  <td className="py-3 text-gray-800">{b.product}</td>
                  <td className="py-3 font-mono text-xs text-gray-600">{b.lot}</td>
                  <td className="py-3 text-gray-600">{b.quantity.toLocaleString()}</td>
                  <td className="py-3 text-gray-800 font-medium">{b.yield}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(b.status))}>
                      {b.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nonconformance Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-gray-400" /> Nonconformance Reports
        </h2>
        <div className="space-y-4">
          {ncrs.map((n) => (
            <div key={n.id} className="pb-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-orange-600">{n.id}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(n.severity))}>
                      {n.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.lot} &middot; {n.date}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700 whitespace-nowrap">
                  {n.disposition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
