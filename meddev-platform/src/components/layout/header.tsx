"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockAlerts = [
  {
    id: 1,
    title: "CAPA-2026-041 overdue",
    type: "warning",
    time: "10 min ago",
  },
  {
    id: 2,
    title: "Document SOP-QA-012 pending approval",
    type: "info",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Supplier audit scheduled - MedParts Inc",
    type: "info",
    time: "2 hours ago",
  },
  {
    id: 4,
    title: "Training deadline approaching: GMP Basics",
    type: "warning",
    time: "3 hours ago",
  },
];

export function Header() {
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search documents, CAPAs, products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 w-full rounded-md border bg-muted/50 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Alerts */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative rounded-md p-2 hover:bg-muted"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {showAlerts && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border bg-white shadow-lg">
              <div className="border-b p-3">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {mockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 border-b p-3 last:border-0 hover:bg-muted/50"
                  >
                    <div
                      className={cn(
                        "mt-1 h-2 w-2 shrink-0 rounded-full",
                        alert.type === "warning"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      )}
                    />
                    <div>
                      <p className="text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-2">
                <button className="w-full rounded-md p-1.5 text-xs text-primary hover:bg-muted">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="rounded-md p-2 hover:bg-muted">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
            QM
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Quality Manager</p>
            <p className="text-[10px] text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
