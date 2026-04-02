"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Ruler,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  CalendarCheck,
} from "lucide-react";

const products = [
  { name: "CardioSense Pro", phase: "Design Verification", progress: 78, status: "in_progress", lead: "Dr. Sarah Chen", target: "Jun 2026" },
  { name: "OrthoFlex Implant v2.1", phase: "Design Input Review", progress: 55, status: "in_progress", lead: "Mark Thompson", target: "Aug 2026" },
  { name: "NeuroStim Controller", phase: "Design Validation", progress: 65, status: "in_progress", lead: "Lisa Park", target: "Jul 2026" },
  { name: "DermaScan Patch Gen2", phase: "Design Transfer", progress: 92, status: "in_progress", lead: "Amy Rodriguez", target: "Apr 2026" },
];

const designReviews = [
  { id: 1, product: "CardioSense Pro", milestone: "Critical Design Review (CDR)", date: "Apr 18, 2026", attendees: 8, status: "planned" },
  { id: 2, product: "OrthoFlex Implant v2.1", milestone: "Preliminary Design Review (PDR)", date: "May 5, 2026", attendees: 6, status: "planned" },
  { id: 3, product: "NeuroStim Controller", milestone: "Final Design Review (FDR)", date: "May 22, 2026", attendees: 10, status: "planned" },
];

const traceabilityMatrix = [
  { id: "DI-001", input: "Heart rate accuracy +/- 2 BPM", output: "DO-001: Sensor calibration algorithm", verification: "VER-001: Bench testing protocol", validation: "VAL-001: Clinical accuracy study" },
  { id: "DI-002", input: "Biocompatibility per ISO 10993", output: "DO-002: Material selection — Ti-6Al-4V", verification: "VER-002: Cytotoxicity testing", validation: "VAL-002: 90-day implant study" },
  { id: "DI-003", input: "Battery life minimum 72 hours", output: "DO-003: Power management firmware", verification: "VER-003: Continuous use bench test", validation: "VAL-003: Simulated use study" },
  { id: "DI-004", input: "Wireless range minimum 10 meters", output: "DO-004: BLE 5.2 radio module", verification: "VER-004: RF range testing", validation: "VAL-004: Clinical environment test" },
];

export default function DesignPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Ruler className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Design Controls</h1>
          <p className="text-sm text-gray-500">Design history files, reviews, and traceability</p>
        </div>
      </div>

      {/* Product Cards with Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{p.phase}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">{p.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full", p.progress >= 90 ? "bg-green-500" : p.progress >= 70 ? "bg-blue-500" : "bg-indigo-500")}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-400">{p.lead}</span>
              <span className="text-xs text-gray-400">{p.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Design Reviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-gray-400" /> Upcoming Design Reviews
        </h2>
        <div className="space-y-4">
          {designReviews.map((r) => (
            <div key={r.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{r.milestone}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.product} &middot; {r.date} &middot; {r.attendees} attendees</p>
              </div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(r.status))}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Design Traceability Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" /> Design Traceability Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Design Input</th>
                <th className="pb-3 font-medium">Design Output</th>
                <th className="pb-3 font-medium">Verification</th>
                <th className="pb-3 font-medium">Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {traceabilityMatrix.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-indigo-600">{t.id}</td>
                  <td className="py-3 text-gray-800 text-xs">{t.input}</td>
                  <td className="py-3 text-gray-600 text-xs">{t.output}</td>
                  <td className="py-3 text-gray-600 text-xs">{t.verification}</td>
                  <td className="py-3 text-gray-600 text-xs">{t.validation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
