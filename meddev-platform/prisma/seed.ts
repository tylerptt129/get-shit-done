import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding MedDev QMS database...\n");

  // Create Organization
  const org = await prisma.organization.create({
    data: {
      name: "MedTech Innovations Inc.",
      slug: "medtech-innovations",
      logo: null,
    },
  });
  console.log(`✅ Organization: ${org.name}`);

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "sarah.chen@medtech.com",
        name: "Sarah Chen",
        title: "VP Quality & Regulatory",
        role: "QUALITY_MANAGER",
        department: "Quality",
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: "mike.johnson@medtech.com",
        name: "Mike Johnson",
        title: "Senior Quality Engineer",
        role: "ENGINEER",
        department: "Quality",
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: "lisa.wang@medtech.com",
        name: "Lisa Wang",
        title: "Regulatory Affairs Manager",
        role: "REGULATORY_MANAGER",
        department: "Regulatory",
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: "james.kim@medtech.com",
        name: "James Kim",
        title: "Design Engineer",
        role: "ENGINEER",
        department: "Design",
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: "dr.patel@medtech.com",
        name: "Dr. Anita Patel",
        title: "Chief Medical Officer",
        role: "ADMIN",
        department: "Clinical",
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ Users: ${users.length} created`);

  // Create Departments
  const depts = await Promise.all(
    [
      { name: "Quality Management", slug: "quality", description: "CAPAs, Audits, Complaints, NCRs" },
      { name: "Regulatory Affairs", slug: "regulatory", description: "Submissions, Compliance Tracking" },
      { name: "Design Controls", slug: "design", description: "Inputs, Outputs, Reviews, V&V" },
      { name: "Production", slug: "production", description: "Manufacturing, Batch Records" },
      { name: "Document Control", slug: "documents", description: "SOPs, Work Instructions, Approvals" },
      { name: "Labeling", slug: "labeling", description: "UDI, IFU, Device Labels" },
      { name: "Clinical Affairs", slug: "clinical", description: "Evaluations, Investigations" },
      { name: "Training", slug: "training", description: "Records, Competency Tracking" },
      { name: "Supply Chain", slug: "supply-chain", description: "Supplier Qualification, Materials" },
    ].map((d) =>
      prisma.department.create({
        data: { ...d, organizationId: org.id },
      })
    )
  );
  console.log(`✅ Departments: ${depts.length} created`);

  // Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "CardioSense Monitor v2",
        productCode: "CS-200",
        description: "Continuous cardiac monitoring device with wireless connectivity",
        classification: "CLASS_II",
        regulatoryClass: "21 CFR 870.2710",
        intendedUse: "Continuous monitoring of cardiac rhythm and rate in adult patients in clinical and home settings.",
        status: "VALIDATION",
        organizationId: org.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "OrthoFlex Implant System",
        productCode: "OF-100",
        description: "Modular orthopedic implant system for joint reconstruction",
        classification: "CLASS_III",
        regulatoryClass: "21 CFR 888.3030",
        intendedUse: "Reconstruction of damaged joints in adult patients requiring total or partial joint replacement.",
        status: "DEVELOPMENT",
        organizationId: org.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "NeuroStim Pulse Generator",
        productCode: "NS-300",
        description: "Implantable neurostimulation pulse generator",
        classification: "CLASS_III",
        regulatoryClass: "21 CFR 882.5805",
        intendedUse: "Electrical stimulation of peripheral nerves for chronic pain management.",
        status: "VERIFICATION",
        organizationId: org.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "DermaScan Pro v3",
        productCode: "DS-150",
        description: "AI-assisted dermatological imaging and analysis system",
        classification: "CLASS_II",
        regulatoryClass: "21 CFR 892.2050",
        intendedUse: "Acquisition and display of dermatological images to assist clinicians in skin lesion assessment.",
        status: "RELEASED",
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ Products: ${products.length} created`);

  // Create Documents
  const documents = await Promise.all([
    prisma.document.create({
      data: {
        documentNumber: "SOP-QA-015",
        title: "Corrective and Preventive Action Procedure",
        type: "SOP",
        category: "Quality",
        status: "IN_REVIEW",
        version: "3.1",
        revision: 3,
        organizationId: org.id,
        createdById: users[0].id,
      },
    }),
    prisma.document.create({
      data: {
        documentNumber: "SOP-QA-012",
        title: "Internal Audit Procedure",
        type: "SOP",
        category: "Quality",
        status: "EFFECTIVE",
        version: "2.0",
        revision: 2,
        effectiveDate: new Date("2026-01-15"),
        reviewDate: new Date("2027-01-15"),
        organizationId: org.id,
        createdById: users[1].id,
      },
    }),
    prisma.document.create({
      data: {
        documentNumber: "WI-PRD-008",
        title: "Assembly Work Instruction - CardioSense",
        type: "WORK_INSTRUCTION",
        category: "Production",
        status: "EFFECTIVE",
        version: "1.4",
        revision: 4,
        effectiveDate: new Date("2026-03-01"),
        reviewDate: new Date("2027-03-01"),
        organizationId: org.id,
        createdById: users[2].id,
      },
    }),
    prisma.document.create({
      data: {
        documentNumber: "POL-QMS-001",
        title: "Quality Policy",
        type: "POLICY",
        category: "Quality",
        status: "EFFECTIVE",
        version: "5.0",
        revision: 5,
        effectiveDate: new Date("2026-01-01"),
        reviewDate: new Date("2027-01-01"),
        organizationId: org.id,
        createdById: users[4].id,
      },
    }),
  ]);
  console.log(`✅ Documents: ${documents.length} created`);

  // Create CAPAs
  const capas = await Promise.all([
    prisma.cAPA.create({
      data: {
        capaNumber: "CAPA-2026-041",
        title: "Biocompatibility test failure - Lot 2026-B12",
        type: "CORRECTIVE",
        source: "NCR",
        description: "Cytotoxicity testing of lot 2026-B12 showed elevated cell death rates exceeding acceptance criteria. Investigation needed to determine root cause.",
        status: "INVESTIGATING",
        priority: "CRITICAL",
        ownerId: users[0].id,
        dueDate: new Date("2026-04-08"),
        organizationId: org.id,
      },
    }),
    prisma.cAPA.create({
      data: {
        capaNumber: "CAPA-2026-040",
        title: "Supplier material deviation - silicone grade",
        type: "PREVENTIVE",
        source: "Supplier Audit",
        description: "BioPlast Ltd supplied silicone with slightly different shore hardness than specification. Preventive measures needed.",
        status: "ACTION_PLANNED",
        priority: "HIGH",
        ownerId: users[3].id,
        dueDate: new Date("2026-04-15"),
        organizationId: org.id,
      },
    }),
    prisma.cAPA.create({
      data: {
        capaNumber: "CAPA-2026-039",
        title: "Labeling error on IFU revision",
        type: "CORRECTIVE",
        source: "Internal Review",
        description: "IFU revision 2.0 contained incorrect dosage information in section 4.2. Root cause: inadequate review process.",
        rootCause: "Reviewer checklist did not include dosage verification step",
        correction: "Recalled affected IFU copies and issued corrected version 2.1",
        correctiveAction: "Updated document review checklist to include mandatory dosage verification",
        status: "CLOSED",
        priority: "MEDIUM",
        ownerId: users[2].id,
        closedAt: new Date("2026-03-28"),
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ CAPAs: ${capas.length} created`);

  // Create Risk Assessments
  const risks = await Promise.all([
    prisma.riskAssessment.create({
      data: {
        productId: products[0].id,
        title: "Cardiac rhythm misinterpretation",
        hazard: "Software algorithm error",
        hazardSituation: "Algorithm fails to detect arrhythmia pattern, leading to missed diagnosis",
        harm: "Delayed treatment, potential cardiac event",
        severityBefore: 5,
        probabilityBefore: 3,
        riskLevelBefore: "HIGH",
        mitigationMeasure: "Redundant algorithm with independent verification, clinician alert threshold",
        severityAfter: 5,
        probabilityAfter: 1,
        riskLevelAfter: "MEDIUM",
        status: "MITIGATED",
        organizationId: org.id,
      },
    }),
    prisma.riskAssessment.create({
      data: {
        productId: products[1].id,
        title: "Implant fracture under load",
        hazard: "Material fatigue failure",
        hazardSituation: "Cyclic loading exceeds material fatigue limit during normal patient activity",
        harm: "Implant failure requiring revision surgery",
        severityBefore: 5,
        probabilityBefore: 2,
        riskLevelBefore: "HIGH",
        mitigationMeasure: "Enhanced fatigue testing protocol, material grade upgrade, design optimization",
        severityAfter: 5,
        probabilityAfter: 1,
        riskLevelAfter: "MEDIUM",
        status: "MITIGATED",
        organizationId: org.id,
      },
    }),
    prisma.riskAssessment.create({
      data: {
        productId: products[2].id,
        title: "Excessive thermal output",
        hazard: "Electrical energy delivery malfunction",
        hazardSituation: "Pulse generator delivers energy above therapeutic range causing tissue heating",
        harm: "Thermal tissue damage, nerve injury",
        severityBefore: 4,
        probabilityBefore: 3,
        riskLevelBefore: "HIGH",
        status: "ANALYZED",
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ Risk Assessments: ${risks.length} created`);

  // Create Suppliers
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: "MedParts Inc.",
        code: "SUP-001",
        type: "COMPONENT",
        status: "APPROVED",
        contactName: "Robert Zhang",
        contactEmail: "rzhang@medparts.com",
        qualityRating: 4.5,
        lastAuditDate: new Date("2026-01-15"),
        nextAuditDate: new Date("2026-07-15"),
        organizationId: org.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: "BioPlast Ltd.",
        code: "SUP-002",
        type: "RAW_MATERIAL",
        status: "CONDITIONAL",
        contactName: "Emma Fischer",
        contactEmail: "efischer@bioplast.de",
        qualityRating: 3.2,
        lastAuditDate: new Date("2025-09-10"),
        nextAuditDate: new Date("2026-04-15"),
        organizationId: org.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: "TechMed Corp.",
        code: "SUP-003",
        type: "CONTRACT_MANUFACTURER",
        status: "APPROVED",
        contactName: "David Park",
        contactEmail: "dpark@techmed.com",
        qualityRating: 4.8,
        lastAuditDate: new Date("2026-03-01"),
        nextAuditDate: new Date("2026-09-01"),
        organizationId: org.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: "SterilPro Services",
        code: "SUP-004",
        type: "STERILIZATION",
        status: "APPROVED",
        contactName: "Maria Santos",
        contactEmail: "msantos@sterilpro.com",
        qualityRating: 4.6,
        lastAuditDate: new Date("2025-11-20"),
        nextAuditDate: new Date("2026-05-20"),
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ Suppliers: ${suppliers.length} created`);

  // Create Trainings
  const trainings = await Promise.all([
    prisma.training.create({
      data: {
        title: "GMP Fundamentals",
        description: "Annual Good Manufacturing Practice refresher training for all production and quality personnel.",
        type: "GMP_TRAINING",
        department: "All",
        requiredBy: new Date("2026-04-15"),
        organizationId: org.id,
      },
    }),
    prisma.training.create({
      data: {
        title: "SOP-QA-015: CAPA Procedure v3.1",
        description: "Training on updated CAPA procedure including new root cause analysis requirements.",
        type: "SOP_TRAINING",
        department: "Quality",
        requiredBy: new Date("2026-04-20"),
        organizationId: org.id,
      },
    }),
    prisma.training.create({
      data: {
        title: "ISO 13485:2016 Awareness",
        description: "Quality management system awareness training covering key requirements.",
        type: "REGULATORY",
        department: "All",
        requiredBy: new Date("2026-03-30"),
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ Trainings: ${trainings.length} created`);

  // Create Audits
  const audits = await Promise.all([
    prisma.audit.create({
      data: {
        title: "Internal Audit - Production Floor",
        type: "INTERNAL",
        scope: "Manufacturing processes, equipment calibration, environmental monitoring, batch record review",
        status: "PLANNED",
        scheduledDate: new Date("2026-04-05"),
        leadAuditor: "Mike Johnson",
        organizationId: org.id,
      },
    }),
    prisma.audit.create({
      data: {
        title: "ISO 13485 Surveillance Audit - TUV",
        type: "CERTIFICATION",
        scope: "Full QMS surveillance per ISO 13485:2016 certification requirements",
        status: "PLANNED",
        scheduledDate: new Date("2026-05-10"),
        leadAuditor: "External - TUV SUD",
        organizationId: org.id,
      },
    }),
  ]);
  console.log(`✅ Audits: ${audits.length} created`);

  // Create Regulatory Submissions
  await Promise.all([
    prisma.regulatorySubmission.create({
      data: {
        productId: products[0].id,
        type: "FDA_510K",
        market: "US",
        regulatoryBody: "FDA",
        submissionNumber: "K261234",
        status: "UNDER_REVIEW",
        submittedAt: new Date("2026-02-15"),
      },
    }),
    prisma.regulatorySubmission.create({
      data: {
        productId: products[1].id,
        type: "CE_MARK",
        market: "EU",
        regulatoryBody: "Notified Body (BSI)",
        status: "PREPARING",
      },
    }),
    prisma.regulatorySubmission.create({
      data: {
        productId: products[3].id,
        type: "FDA_510K",
        market: "US",
        regulatoryBody: "FDA",
        submissionNumber: "K251098",
        status: "APPROVED",
        submittedAt: new Date("2025-10-20"),
        approvedAt: new Date("2026-01-15"),
      },
    }),
  ]);
  console.log(`✅ Regulatory Submissions: 3 created`);

  // Create Labels
  await Promise.all([
    prisma.label.create({
      data: {
        productId: products[0].id,
        name: "CardioSense Device Label v2.1",
        type: "DEVICE_LABEL",
        version: "2.1",
        status: "APPROVED",
        udiDi: "00850123456789",
        lotNumber: "CS-2026-B12",
      },
    }),
    prisma.label.create({
      data: {
        productId: products[0].id,
        name: "CardioSense IFU v2.1",
        type: "IFU",
        version: "2.1",
        status: "DRAFT",
        udiDi: "00850123456789",
      },
    }),
    prisma.label.create({
      data: {
        productId: products[3].id,
        name: "DermaScan Outer Packaging",
        type: "OUTER_PACKAGING",
        version: "1.3",
        status: "APPROVED",
        udiDi: "00850123456791",
        lotNumber: "DS-2026-B08",
      },
    }),
  ]);
  console.log(`✅ Labels: 3 created`);

  // Create Clinical Evaluations
  await Promise.all([
    prisma.clinicalEvaluation.create({
      data: {
        title: "CardioSense v2 Clinical Investigation",
        type: "CLINICAL_INVESTIGATION",
        status: "ACTIVE",
        protocol: "PROT-CS-001",
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-07-15"),
        subjectCount: 120,
        summary: "Prospective, multi-center clinical investigation to evaluate the safety and effectiveness of the CardioSense v2 cardiac monitoring system.",
      },
    }),
    prisma.clinicalEvaluation.create({
      data: {
        title: "OrthoFlex Literature Review",
        type: "LITERATURE_REVIEW",
        status: "COMPLETE",
        startDate: new Date("2025-10-01"),
        endDate: new Date("2026-02-28"),
        summary: "Systematic literature review of predicate and equivalent orthopedic implant devices.",
      },
    }),
  ]);
  console.log(`✅ Clinical Evaluations: 2 created`);

  console.log("\n🎉 Seed complete! MedDev QMS database populated with demo data.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
