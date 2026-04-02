import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
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
    riskMatrix: {
      unacceptable: 0,
      high: 3,
      medium: 8,
      low: 12,
      negligible: 5,
    },
    aiUsage: {
      totalCalls: 142,
      totalTokens: 584200,
      estimatedCost: "$4.27",
    },
    generatedAt: new Date().toISOString(),
  });
}
