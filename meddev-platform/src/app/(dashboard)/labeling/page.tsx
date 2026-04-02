"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Tag,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react";

const summaryCards = [
  { label: "Active Labels", value: 34, icon: Tag, color: "text-pink-600", bg: "bg-pink-50" },
  { label: "Pending Review", value: 6, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "UDI Compliant", value: 28, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Requiring Update", value: 4, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
];

const labels = [
  { id: "LBL-001", product: "CardioSense Pro", udiDI: "(01)00850012345678", version: "Rev 3", market: "US / EU", status: "approved", lastUpdated: "Mar 10, 2026" },
  { id: "LBL-002", product: "OrthoFlex Implant", udiDI: "(01)00850012345685", version: "Rev 2", market: "US / EU / CA", status: "approved", lastUpdated: "Feb 22, 2026" },
  { id: "LBL-003", product: "NeuroStim Controller", udiDI: "(01)00850012345692", version: "Rev 4", market: "US", status: "in_review", lastUpdated: "Mar 28, 2026" },
  { id: "LBL-004", product: "DermaScan Patch", udiDI: "(01)00850012345708", version: "Rev 1", market: "US / EU", status: "approved", lastUpdated: "Jan 15, 2026" },
  { id: "LBL-005", product: "CardioSense Pro (IFU)", udiDI: "—", version: "Rev 3", market: "US / EU", status: "in_review", lastUpdated: "Mar 30, 2026" },
  { id: "LBL-006", product: "OrthoFlex Implant (Sterile)", udiDI: "(01)00850012345715", version: "Rev 2", market: "EU", status: "draft", lastUpdated: "Apr 1, 2026" },
];

const udiCompliance = [
  { product: "CardioSense Pro", gudid: "Registered", accessGudid: "Published", eudamed: "Registered", status: "completed" },
  { product: "OrthoFlex Implant", gudid: "Registered", accessGudid: "Published", eudamed: "Registered", status: "completed" },
  { product: "NeuroStim Controller", gudid: "Registered", accessGudid: "Published", eudamed: "Pending", status: "in_progress" },
  { product: "DermaScan Patch", gudid: "Registered", accessGudid: "Published", eudamed: "Registered", status: "completed" },
];

export default function LabelingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-pink-50 rounded-lg">
          <Tag className="h-6 w-6 text-pink-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Labeling</h1>
          <p className="text-sm text-gray-500">Label management, UDI compliance, and regulatory labeling</p>
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

      {/* Label Register */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Label Register</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Label ID</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">UDI-DI</th>
                <th className="pb-3 font-medium">Version</th>
                <th className="pb-3 font-medium">Market</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {labels.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-pink-600">{l.id}</td>
                  <td className="py-3 text-gray-800">{l.product}</td>
                  <td className="py-3 font-mono text-xs text-gray-600">{l.udiDI}</td>
                  <td className="py-3 text-gray-600">{l.version}</td>
                  <td className="py-3 text-gray-600">{l.market}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(l.status))}>
                      {l.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{l.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UDI Compliance Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" /> UDI Compliance Status
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">GUDID</th>
                <th className="pb-3 font-medium">AccessGUDID</th>
                <th className="pb-3 font-medium">EUDAMED</th>
                <th className="pb-3 font-medium">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {udiCompliance.map((u) => (
                <tr key={u.product} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900">{u.product}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-800">{u.gudid}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-800">{u.accessGudid}</span>
                  </td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", u.eudamed === "Registered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800")}>
                      {u.eudamed}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(u.status))}>
                      {u.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
