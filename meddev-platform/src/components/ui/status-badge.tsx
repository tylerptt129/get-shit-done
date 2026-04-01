import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  healthy: "bg-green-100 text-green-700 border-green-200",
  active: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  error: "bg-red-100 text-red-700 border-red-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status.toLowerCase()] || statusStyles.inactive,
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status.toLowerCase() === "healthy" || status.toLowerCase() === "active"
            ? "bg-green-500"
            : status.toLowerCase() === "warning"
            ? "bg-amber-500"
            : status.toLowerCase() === "error"
            ? "bg-red-500"
            : "bg-gray-400"
        )}
      />
      {status}
    </span>
  );
}
