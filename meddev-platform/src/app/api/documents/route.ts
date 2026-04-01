import { NextResponse } from "next/server";

const documents = [
  { id: "SOP-QA-015", title: "Corrective and Preventive Action Procedure", type: "SOP", status: "IN_REVIEW", version: "3.1", category: "Quality", effective: null, reviewDate: "2026-04-10" },
  { id: "SOP-QA-012", title: "Internal Audit Procedure", type: "SOP", status: "EFFECTIVE", version: "2.0", category: "Quality", effective: "2026-01-15", reviewDate: "2027-01-15" },
  { id: "WI-PRD-008", title: "Assembly Work Instruction - CardioSense", type: "WORK_INSTRUCTION", status: "EFFECTIVE", version: "1.4", category: "Production", effective: "2026-03-01", reviewDate: "2027-03-01" },
  { id: "FRM-QA-021", title: "CAPA Investigation Form", type: "FORM", status: "APPROVED", version: "2.1", category: "Quality", effective: "2026-04-01", reviewDate: "2027-04-01" },
  { id: "POL-QMS-001", title: "Quality Policy", type: "POLICY", status: "EFFECTIVE", version: "5.0", category: "Quality", effective: "2026-01-01", reviewDate: "2027-01-01" },
  { id: "SPC-DE-003", title: "CardioSense v2 Product Specification", type: "SPECIFICATION", status: "DRAFT", version: "0.3", category: "Design", effective: null, reviewDate: null },
  { id: "RPT-VA-001", title: "OrthoFlex Biocompatibility Report", type: "REPORT", status: "IN_REVIEW", version: "1.0", category: "Regulatory", effective: null, reviewDate: "2026-04-05" },
];

export async function GET() {
  return NextResponse.json({
    documents,
    total: 247,
    effective: 215,
    inReview: 8,
    draft: 14,
    archived: 10,
  });
}
