"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, FileCheck, Ruler, Factory, FileText, Tag,
  Stethoscope, GraduationCap, Truck, LayoutDashboard,
  ChevronLeft, ChevronRight, Brain, ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const departments = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, color: "text-slate-600" },
  { name: "Quality", href: "/quality", icon: Shield, color: "text-blue-600", description: "CAPAs, Audits, NCRs" },
  { name: "Regulatory", href: "/regulatory", icon: FileCheck, color: "text-purple-600", description: "Submissions, Compliance" },
  { name: "Design Controls", href: "/design", icon: Ruler, color: "text-indigo-600", description: "Inputs, Outputs, Reviews" },
  { name: "Production", href: "/production", icon: Factory, color: "text-orange-600", description: "Manufacturing, Batch Records" },
  { name: "Documents", href: "/documents", icon: FileText, color: "text-emerald-600", description: "SOPs, Work Instructions" },
  { name: "Labeling", href: "/labeling", icon: Tag, color: "text-pink-600", description: "UDI, IFU, Labels" },
  { name: "Clinical", href: "/clinical", icon: Stethoscope, color: "text-red-600", description: "Evaluations, Studies" },
  { name: "Training", href: "/training", icon: GraduationCap, color: "text-amber-600", description: "Records, Competency" },
  { name: "Supply Chain", href: "/supply-chain", icon: Truck, color: "text-teal-600", description: "Suppliers, Materials" },
  { name: "Audit Trail", href: "/audit-trail", icon: ClipboardList, color: "text-gray-600", description: "Immutable Event Log" },
  { name: "AI Assistant", href: "/ai", icon: Brain, color: "text-violet-600", description: "AI-powered QMS tools" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-full flex-col border-r bg-white transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">MedDev QMS</h1>
              <p className="text-[10px] text-muted-foreground">Drizzle + Clerk + AI</p>
            </div>
          </div>
        )}
        <button onClick={onToggle} className="rounded-md p-1.5 hover:bg-muted" aria-label={collapsed ? "Expand" : "Collapse"}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {departments.map((dept) => {
          const isActive = dept.href === "/" ? pathname === "/" : pathname.startsWith(dept.href);
          const Icon = dept.icon;
          return (
            <Link key={dept.href} href={dept.href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={collapsed ? dept.name : undefined}>
              <Icon className={cn("h-5 w-5 shrink-0", dept.color)} />
              {!collapsed && (
                <div className="flex flex-col">
                  <span>{dept.name}</span>
                  {dept.description && <span className="text-[10px] text-muted-foreground">{dept.description}</span>}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t p-4">
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xs font-medium text-blue-900">QMS v0.2.0</p>
            <p className="text-[10px] text-blue-700">Drizzle ORM | Multi-tenant</p>
          </div>
        </div>
      )}
    </aside>
  );
}
