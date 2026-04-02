"use client";

import { useEffect, useState } from "react";
import { Server, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  stack: Record<string, string>;
  modules: Record<string, { status: string; endpoints: number }>;
}

export function SystemStatus() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health");
      setHealth(await res.json());
    } catch { setHealth(null); }
    setLoading(false);
  };

  useEffect(() => { fetchHealth(); const i = setInterval(fetchHealth, 30000); return () => clearInterval(i); }, []);

  const moduleCount = health ? Object.values(health.modules).filter((m) => m.status === "active").length : 0;
  const totalEndpoints = health ? Object.values(health.modules).reduce((s, m) => s + m.endpoints, 0) : 0;

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2"><Server className="h-5 w-5 text-muted-foreground" /><h2 className="font-semibold">System Status</h2></div>
        <button onClick={fetchHealth} className="rounded-md p-1 hover:bg-muted"><RefreshCw className={cn("h-4 w-4 text-muted-foreground", loading && "animate-spin")} /></button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Platform</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700"><span className="h-1.5 w-1.5 rounded-full bg-green-500" />{health?.status ?? "loading"}</span>
        </div>
        <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Version</span><span className="text-sm font-mono">{health?.version ?? "—"}</span></div>
        <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Active Modules</span><span className="text-sm font-medium">{moduleCount}/11</span></div>
        <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">API Endpoints</span><span className="text-sm font-medium">{totalEndpoints}</span></div>
        <div className="pt-2 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {["Drizzle ORM", "postgres-js", "Clerk Auth", "Vercel AI", "@t3-oss/env"].map((t) => (
              <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{t}</span>
            ))}
          </div>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Module Health</p>
          <div className="grid grid-cols-3 gap-1.5">
            {health && Object.entries(health.modules).map(([name, mod]) => (
              <div key={name} className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1">
                <div className={cn("h-1.5 w-1.5 rounded-full", mod.status === "active" ? "bg-green-500" : "bg-red-500")} />
                <span className="text-[10px] capitalize">{name.replace(/([A-Z])/g, " $1").trim()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">Compliance</p>
          <div className="flex flex-wrap gap-1.5">
            {["ISO 13485", "21 CFR 820", "ISO 14971", "EU MDR", "21 CFR 11"].map((s) => (
              <span key={s} className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
