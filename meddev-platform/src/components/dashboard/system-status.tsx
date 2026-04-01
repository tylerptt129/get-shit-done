"use client";

import { useEffect, useState } from "react";
import { Server, Database, Shield, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  modules: Record<string, { status: string; endpoints: number }>;
}

export function SystemStatus() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    } catch {
      setHealth(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const moduleCount = health
    ? Object.values(health.modules).filter((m) => m.status === "active").length
    : 0;
  const totalEndpoints = health
    ? Object.values(health.modules).reduce((sum, m) => sum + m.endpoints, 0)
    : 0;

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold">System Status</h2>
        </div>
        <button
          onClick={fetchHealth}
          className="rounded-md p-1 hover:bg-muted"
          title="Refresh"
        >
          <RefreshCw className={cn("h-4 w-4 text-muted-foreground", loading && "animate-spin")} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        {/* Overall Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Platform</span>
          <StatusBadge status={health?.status ?? "loading"} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Version</span>
          <span className="text-sm font-mono">{health?.version ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Active Modules</span>
          <span className="text-sm font-medium">{moduleCount}/9</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">API Endpoints</span>
          <span className="text-sm font-medium">{totalEndpoints}</span>
        </div>

        {/* Module Grid */}
        <div className="pt-2 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Module Health</p>
          <div className="grid grid-cols-3 gap-2">
            {health &&
              Object.entries(health.modules).map(([name, mod]) => (
                <div
                  key={name}
                  className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5"
                >
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      mod.status === "active" ? "bg-green-500" : "bg-red-500"
                    )}
                  />
                  <span className="text-[10px] capitalize">{name}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Compliance Standards */}
        <div className="pt-2 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Compliance Framework</p>
          <div className="flex flex-wrap gap-1.5">
            {["ISO 13485", "21 CFR 820", "ISO 14971", "EU MDR", "21 CFR 11"].map((std) => (
              <span
                key={std}
                className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700"
              >
                {std}
              </span>
            ))}
          </div>
        </div>

        {health && (
          <p className="text-[10px] text-muted-foreground text-right">
            Updated: {new Date(health.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
