"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Brain,
  Zap,
  Coins,
  BarChart3,
  FileSearch,
  Search,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const summaryCards = [
  { label: "Total Calls", value: 142, icon: Zap, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Tokens Used", value: "584.2K", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Estimated Cost", value: "$4.27", icon: Coins, color: "text-green-600", bg: "bg-green-50" },
  { label: "Top Feature", value: "Document Review", icon: FileSearch, color: "text-amber-600", bg: "bg-amber-50" },
];

const features = [
  {
    title: "Document Review AI",
    description: "Automated review of SOPs, work instructions, and forms for completeness and regulatory compliance.",
    icon: FileSearch,
    color: "text-blue-600",
    bg: "bg-blue-50",
    calls: 58,
    status: "active",
  },
  {
    title: "CAPA Root Cause Analysis",
    description: "AI-assisted root cause identification using 5-Why, Ishikawa, and fault tree analysis methods.",
    icon: Search,
    color: "text-red-600",
    bg: "bg-red-50",
    calls: 34,
    status: "active",
  },
  {
    title: "Risk Assessment AI",
    description: "Automated risk scoring and mitigation recommendations based on ISO 14971 risk management framework.",
    icon: AlertTriangle,
    color: "text-orange-600",
    bg: "bg-orange-50",
    calls: 28,
    status: "active",
  },
  {
    title: "Compliance Check",
    description: "Real-time compliance verification against ISO 13485, 21 CFR 820, EU MDR, and other applicable standards.",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-50",
    calls: 22,
    status: "active",
  },
];

const usageByFeature = [
  { feature: "Document Review AI", calls: 58, tokens: "238,400", cost: "$1.74", model: "claude-sonnet-4-20250514" },
  { feature: "CAPA Root Cause Analysis", calls: 34, tokens: "156,800", cost: "$1.15", model: "claude-sonnet-4-20250514" },
  { feature: "Risk Assessment AI", calls: 28, tokens: "112,000", cost: "$0.82", model: "claude-sonnet-4-20250514" },
  { feature: "Compliance Check", calls: 22, tokens: "77,000", cost: "$0.56", model: "claude-haiku-4-20250514" },
];

export default function AIPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-violet-50 rounded-lg">
          <Brain className="h-6 w-6 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-sm text-gray-500">AI-powered QMS assistance with token &amp; cost tracking</p>
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

      {/* AI Features Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg flex-shrink-0", f.bg)}>
                  <f.icon className={cn("h-5 w-5", f.color)} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{f.title}</h3>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(f.status))}>
                      {f.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{f.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{f.calls} calls this month</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage by Feature Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage by Feature</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Feature</th>
                <th className="pb-3 font-medium">Calls</th>
                <th className="pb-3 font-medium">Tokens</th>
                <th className="pb-3 font-medium">Est. Cost</th>
                <th className="pb-3 font-medium">Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usageByFeature.map((u) => (
                <tr key={u.feature} className="hover:bg-gray-50">
                  <td className="py-3 text-gray-800 font-medium">{u.feature}</td>
                  <td className="py-3 text-gray-600">{u.calls}</td>
                  <td className="py-3 font-mono text-xs text-gray-600">{u.tokens}</td>
                  <td className="py-3 font-medium text-gray-900">{u.cost}</td>
                  <td className="py-3 font-mono text-xs text-gray-500">{u.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">All AI usage tracked per-call with model, token count, and estimated cost</p>
        </div>
      </div>
    </div>
  );
}
