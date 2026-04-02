import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-800",
    in_review: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    effective: "bg-blue-100 text-blue-800",
    obsolete: "bg-red-100 text-red-800",
    open: "bg-red-100 text-red-800",
    closed: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    planned: "bg-purple-100 text-purple-800",
    initiated: "bg-gray-100 text-gray-800",
    investigating: "bg-amber-100 text-amber-800",
    action_planned: "bg-blue-100 text-blue-800",
    action_implemented: "bg-teal-100 text-teal-800",
    effectiveness_check: "bg-indigo-100 text-indigo-800",
    negligible: "bg-gray-100 text-gray-700",
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
    unacceptable: "bg-red-200 text-red-900",
    preparing: "bg-gray-100 text-gray-700",
    submitted: "bg-blue-100 text-blue-800",
    under_review: "bg-amber-100 text-amber-800",
    additional_info: "bg-orange-100 text-orange-800",
    rejected: "bg-red-100 text-red-800",
    active: "bg-green-100 text-green-700",
    healthy: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    conditional: "bg-amber-100 text-amber-700",
    disqualified: "bg-red-100 text-red-700",
  };
  return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
}

export function getRiskScore(severity: number, probability: number): number {
  return severity * probability;
}

export function getRiskLevel(score: number): string {
  if (score <= 2) return "negligible";
  if (score <= 4) return "low";
  if (score <= 9) return "medium";
  if (score <= 16) return "high";
  return "unacceptable";
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
