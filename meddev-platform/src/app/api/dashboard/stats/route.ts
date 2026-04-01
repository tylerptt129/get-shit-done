import { NextResponse } from "next/server";

// Dashboard stats endpoint - returns current QMS metrics
// In production, these would come from Prisma queries against the database
export async function GET() {
  const stats = {
    summary: {
      openCAPAs: 12,
      pendingApprovals: 8,
      overdueItems: 5,
      activeSubmissions: 3,
      totalDocuments: 247,
      approvedSuppliers: 4,
      activeTrainings: 6,
      openComplaints: 7,
    },
    compliance: {
      documentControl: { score: 94, target: 95 },
      capaEffectiveness: { score: 88, target: 90 },
      trainingCompliance: { score: 91, target: 95 },
      supplierQuality: { score: 96, target: 90 },
      auditReadiness: { score: 87, target: 90 },
    },
    trends: {
      capasOpenedThisMonth: 4,
      capasClosedThisMonth: 5,
      complaintsThisMonth: 3,
      ncrsThisMonth: 6,
      documentsApproved: 12,
    },
    riskMatrix: {
      unacceptable: 0,
      high: 3,
      medium: 8,
      low: 12,
      negligible: 5,
    },
    upcomingDeadlines: [
      { title: "Internal Audit - Production Floor", date: "2026-04-05", department: "Quality", priority: "HIGH" },
      { title: "510(k) Submission - OrthoFlex", date: "2026-04-10", department: "Regulatory", priority: "CRITICAL" },
      { title: "Design Review Gate 3 - NeuroStim", date: "2026-04-12", department: "Design", priority: "HIGH" },
      { title: "Supplier Requalification - BioPlast", date: "2026-04-15", department: "Supply Chain", priority: "MEDIUM" },
      { title: "Annual Management Review", date: "2026-04-20", department: "Quality", priority: "HIGH" },
    ],
    generatedAt: new Date().toISOString(),
  };

  return NextResponse.json(stats);
}
