import { NextResponse } from "next/server";

const capas = [
  { id: "CAPA-2026-041", title: "Biocompatibility test failure - Lot 2026-B12", type: "CORRECTIVE", status: "INVESTIGATING", priority: "CRITICAL", owner: "Sarah Chen", due: "2026-04-08", source: "NCR" },
  { id: "CAPA-2026-040", title: "Supplier material deviation - silicone grade", type: "PREVENTIVE", status: "ACTION_PLANNED", priority: "HIGH", owner: "James Kim", due: "2026-04-15", source: "Supplier Audit" },
  { id: "CAPA-2026-039", title: "Labeling error on IFU revision", type: "CORRECTIVE", status: "CLOSED", priority: "MEDIUM", owner: "Lisa Wang", due: "2026-03-28", source: "Internal Review" },
  { id: "CAPA-2026-038", title: "Sterilization cycle parameter drift", type: "BOTH", status: "EFFECTIVENESS_CHECK", priority: "HIGH", owner: "Dr. Patel", due: "2026-04-20", source: "Process Monitoring" },
  { id: "CAPA-2026-037", title: "Assembly fixture calibration gap", type: "PREVENTIVE", status: "ACTION_IMPLEMENTED", priority: "MEDIUM", owner: "Mike Johnson", due: "2026-04-05", source: "Internal Audit" },
];

export async function GET() {
  return NextResponse.json({
    capas,
    summary: {
      open: 12,
      closedThisMonth: 5,
      overdue: 3,
      effectiveness: "88%",
    },
  });
}
