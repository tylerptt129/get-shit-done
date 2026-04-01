import { NextResponse } from "next/server";

export async function GET() {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
    platform: "MedDev QMS",
    compliance: {
      iso13485: "2016",
      cfrPart820: true,
      iso14971: "2019",
      euMDR: "2017/745",
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
    },
  };

  return NextResponse.json(health);
}
