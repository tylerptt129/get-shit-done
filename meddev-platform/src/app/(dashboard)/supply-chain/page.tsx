"use client";

import { cn, getStatusColor } from "@/lib/utils";
import {
  Truck,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  CalendarCheck,
  Star,
} from "lucide-react";

const summaryCards = [
  { label: "Approved Suppliers", value: 42, icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Qualified", value: 38, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Conditional", value: 3, icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Pending Audit", value: 5, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
];

const suppliers = [
  { id: "SUP-001", name: "MedTech Components Ltd", category: "Raw Materials", location: "Munich, Germany", rating: 4.8, status: "approved", lastAudit: "Oct 2025", nextAudit: "Oct 2026" },
  { id: "SUP-002", name: "PrecisionCast Inc", category: "Machined Parts", location: "Minneapolis, US", rating: 4.5, status: "approved", lastAudit: "Sep 2025", nextAudit: "Sep 2026" },
  { id: "SUP-003", name: "BioSurface Technologies", category: "Coatings", location: "Zurich, Switzerland", rating: 4.9, status: "approved", lastAudit: "Nov 2025", nextAudit: "Nov 2026" },
  { id: "SUP-004", name: "SterilePack Solutions", category: "Packaging", location: "Dublin, Ireland", rating: 4.2, status: "conditional", lastAudit: "Aug 2025", nextAudit: "May 2026" },
  { id: "SUP-005", name: "NanoSensor Corp", category: "Electronics", location: "San Jose, US", rating: 4.7, status: "approved", lastAudit: "Dec 2025", nextAudit: "Dec 2026" },
  { id: "SUP-006", name: "PolyMed Materials", category: "Polymers", location: "Shanghai, China", rating: 3.8, status: "conditional", lastAudit: "Jul 2025", nextAudit: "Apr 2026" },
  { id: "SUP-007", name: "CleanRoom Supplies Co", category: "Consumables", location: "Boston, US", rating: 4.6, status: "approved", lastAudit: "Jan 2026", nextAudit: "Jan 2027" },
];

const upcomingAudits = [
  { id: 1, supplier: "PolyMed Materials", type: "Re-qualification Audit", date: "Apr 15, 2026", auditor: "James Wilson", reason: "Conditional status — corrective actions verification" },
  { id: 2, supplier: "SterilePack Solutions", type: "Surveillance Audit", date: "May 8, 2026", auditor: "Dr. Sarah Chen", reason: "Annual surveillance — packaging process review" },
  { id: 3, supplier: "MedTech Components Ltd", type: "Annual Audit", date: "Oct 12, 2026", auditor: "Mark Thompson", reason: "Routine annual re-qualification" },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn("h-3.5 w-3.5", s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200")}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

export default function SupplyChainPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-50 rounded-lg">
          <Truck className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supply Chain</h1>
          <p className="text-sm text-gray-500">Supplier management, qualification, and audits</p>
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

      {/* Approved Supplier List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Approved Supplier List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Supplier</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Audit</th>
                <th className="pb-3 font-medium">Next Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-teal-600">{s.id}</td>
                  <td className="py-3 text-gray-800 font-medium">{s.name}</td>
                  <td className="py-3 text-gray-600">{s.category}</td>
                  <td className="py-3 text-gray-600">{s.location}</td>
                  <td className="py-3"><RatingStars rating={s.rating} /></td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getStatusColor(s.status))}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{s.lastAudit}</td>
                  <td className="py-3 text-gray-600 whitespace-nowrap">{s.nextAudit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Supplier Audits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-gray-400" /> Upcoming Supplier Audits
        </h2>
        <div className="space-y-4">
          {upcomingAudits.map((a) => (
            <div key={a.id} className="pb-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.supplier} — {a.type}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.auditor} &middot; {a.date}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
