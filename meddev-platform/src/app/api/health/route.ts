import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "0.2.0",
    platform: "MedDev QMS",
    stack: {
      framework: "Next.js 14",
      orm: "Drizzle ORM",
      database: "PostgreSQL (postgres-js)",
      auth: "Clerk",
      ai: "OpenAI via Vercel AI SDK",
      envValidation: "@t3-oss/env-nextjs",
    },
    compliance: {
      iso13485: "2016",
      cfrPart820: true,
      iso14971: "2019",
      euMDR: "2017/745",
      cfrPart11: true,
    },
    modules: {
      quality: { status: "active", endpoints: 4 },
      regulatory: { status: "active", endpoints: 3 },
      design: { status: "active", endpoints: 5 },
      production: { status: "active", endpoints: 3 },
      documents: { status: "active", endpoints: 4 },
      labeling: { status: "active", endpoints: 3 },
      clinical: { status: "active", endpoints: 3 },
      training: { status: "active", endpoints: 3 },
      supplyChain: { status: "active", endpoints: 3 },
      auditTrail: { status: "active", endpoints: 2 },
      aiAssistant: { status: "active", endpoints: 2 },
    },
  });
}
