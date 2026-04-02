import { db } from "@/server/db";
import { aiUsageLogs } from "@/server/db/schema";

// Cost per 1K tokens (approximate, varies by model)
const COST_PER_1K_TOKENS: Record<string, { input: number; output: number }> = {
  "gpt-4o": { input: 0.0025, output: 0.01 },
  "gpt-4o-mini": { input: 0.00015, output: 0.0006 },
  "gpt-4-turbo": { input: 0.01, output: 0.03 },
};

interface AIUsageParams {
  tenantId: string;
  userId: string;
  model: string;
  provider: string;
  promptTokens: number;
  completionTokens: number;
  feature: string;
  metadata?: Record<string, any>;
}

export async function trackAIUsage(params: AIUsageParams) {
  const totalTokens = params.promptTokens + params.completionTokens;
  const modelCost = COST_PER_1K_TOKENS[params.model] ?? { input: 0.001, output: 0.002 };
  const estimatedCost =
    (params.promptTokens / 1000) * modelCost.input +
    (params.completionTokens / 1000) * modelCost.output;

  await db.insert(aiUsageLogs).values({
    tenantId: params.tenantId,
    userId: params.userId,
    model: params.model,
    provider: params.provider,
    promptTokens: params.promptTokens,
    completionTokens: params.completionTokens,
    totalTokens,
    estimatedCost: Math.round(estimatedCost * 1000000) / 1000000, // 6 decimal places
    feature: params.feature,
    metadata: params.metadata ?? null,
  });

  return { totalTokens, estimatedCost };
}

export async function getAIUsageSummary(tenantId: string) {
  // Returns mock summary - in production would aggregate from aiUsageLogs
  return {
    totalCalls: 142,
    totalTokens: 584200,
    totalCost: 4.27,
    topFeatures: [
      { feature: "document_review", calls: 45, cost: 1.82 },
      { feature: "capa_analysis", calls: 38, cost: 1.15 },
      { feature: "risk_assessment", calls: 32, cost: 0.78 },
      { feature: "compliance_check", calls: 27, cost: 0.52 },
    ],
  };
}
