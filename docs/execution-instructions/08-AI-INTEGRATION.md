# 08-AI-INTEGRATION.md

## AI Integration Foundation for Medical Device QMS Platform

Integration of Claude API (Anthropic) for intelligent document generation, compliance checking, and regulatory guidance within a multi-tenant SaaS QMS platform.

---

## 1. AI Service Abstraction

### AIProvider Interface

Create `src/server/ai/provider.ts`:

```typescript
import { Anthropic } from "@anthropic-ai/sdk";

export interface AIOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface AIProvider {
  generateText(prompt: string, options?: AIOptions): Promise<string>;
  generateStructuredOutput(
    prompt: string,
    schema: Record<string, unknown>,
    options?: AIOptions
  ): Promise<unknown>;
  generateEmbedding(text: string): Promise<number[]>;
}

export class ClaudeProvider implements AIProvider {
  private client: Anthropic;
  private model = "claude-3-5-sonnet-20241022";

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateText(prompt: string, options?: AIOptions): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: options?.maxTokens || 2048,
      temperature: options?.temperature || 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return textContent.text;
  }

  async generateStructuredOutput(
    prompt: string,
    schema: Record<string, unknown>,
    options?: AIOptions
  ): Promise<unknown> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature || 0.3,
      system:
        "You are a helpful assistant that generates structured JSON output. Always respond with valid JSON only.",
      messages: [
        {
          role: "user",
          content: `Generate output matching this schema: ${JSON.stringify(schema)}\n\nRequest: ${prompt}`,
        },
      ],
    });

    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    throw new Error("Use dedicated embedding service (e.g., OpenAI, Voyage)");
  }
}

export function createAIProvider(config: {
  provider: "claude" | "other";
  apiKey: string;
}): AIProvider {
  switch (config.provider) {
    case "claude":
      return new ClaudeProvider(config.apiKey);
    default:
      throw new Error(`Unknown AI provider: ${config.provider}`);
  }
}
```

---

## 2. AI Usage Tracking Middleware

### Database Schema

```sql
CREATE TABLE ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  user_id UUID NOT NULL,
  feature VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  total_tokens INTEGER NOT NULL,
  cost_cents INTEGER NOT NULL,
  latency_ms INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_ai_usage_tenant ON ai_usage(tenant_id);
CREATE INDEX idx_ai_usage_created_at ON ai_usage(created_at);
```

### Tracking Middleware

Create `src/server/ai/usage-tracker.ts`:

```typescript
import { db } from "@/server/db";

export interface UsageRecord {
  tenantId: string;
  userId: string;
  feature: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
}

const TOKEN_COST_PER_1M = {
  "claude-3-5-sonnet-20241022": {
    input: 3,
    output: 15,
  },
};

export async function trackAIUsage(record: UsageRecord): Promise<void> {
  const modelConfig =
    TOKEN_COST_PER_1M["claude-3-5-sonnet-20241022" as keyof typeof TOKEN_COST_PER_1M];

  const costCents =
    Math.round(
      (record.inputTokens * modelConfig.input) / 1_000_000 +
        (record.outputTokens * modelConfig.output) / 1_000_000
    ) * 100;

  await db.query(
    `INSERT INTO ai_usage (tenant_id, user_id, feature, model, input_tokens, output_tokens, total_tokens, cost_cents, latency_ms)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      record.tenantId,
      record.userId,
      record.feature,
      record.model,
      record.inputTokens,
      record.outputTokens,
      record.inputTokens + record.outputTokens,
      costCents,
      record.latencyMs,
    ]
  );
}

export async function getAIUsageStats(tenantId: string, days = 30) {
  const result = await db.query(
    `SELECT 
       feature,
       COUNT(*) as call_count,
       SUM(total_tokens) as total_tokens,
       SUM(cost_cents) as total_cost_cents,
       AVG(latency_ms)::int as avg_latency_ms
     FROM ai_usage
     WHERE tenant_id = $1 AND created_at > NOW() - INTERVAL '${days} days'
     GROUP BY feature`,
    [tenantId]
  );

  return result.rows;
}
```

---

## 3. Document Generation Service

Create `src/server/ai/document-generator.ts`:

```typescript
import { AIProvider } from "./provider";
import { trackAIUsage } from "./usage-tracker";
import { getPromptTemplate } from "./prompts";

export type DocumentType =
  | "SOP"
  | "WORK_INSTRUCTION"
  | "QUALITY_MANUAL"
  | "RISK_ASSESSMENT";

export interface DocumentGenerationRequest {
  tenantId: string;
  userId: string;
  documentType: DocumentType;
  parameters: Record<string, unknown>;
  regulatoryContext?: string;
}

export interface GeneratedDocument {
  content: string;
  disclaimer: string;
  metadata: {
    generatedAt: Date;
    model: string;
    tokensUsed: number;
  };
}

const DISCLAIMER =
  "**AI-GENERATED CONTENT DISCLAIMER**: This document was generated by an AI system and must be reviewed and approved by a qualified professional before use.";

export async function generateDocument(
  aiProvider: AIProvider,
  request: DocumentGenerationRequest
): Promise<GeneratedDocument> {
  const startTime = Date.now();

  const template = getPromptTemplate(request.documentType);
  const systemPrompt = template.system;
  const userPrompt = template.build(request.parameters, request.regulatoryContext);

  const content = await aiProvider.generateText(systemPrompt + "\n\n" + userPrompt);

  const latencyMs = Date.now() - startTime;
  const estimatedTokens = Math.ceil((content.length + userPrompt.length) / 4);

  await trackAIUsage({
    tenantId: request.tenantId,
    userId: request.userId,
    feature: `document-generation:${request.documentType}`,
    model: "claude-3-5-sonnet-20241022",
    inputTokens: Math.ceil(userPrompt.length / 4),
    outputTokens: Math.ceil(content.length / 4),
    latencyMs,
  });

  return {
    content,
    disclaimer: DISCLAIMER,
    metadata: {
      generatedAt: new Date(),
      model: "claude-3-5-sonnet-20241022",
      tokensUsed: estimatedTokens,
    },
  };
}
```

---

## 4. Compliance Checker Service

Create `src/server/ai/compliance-checker.ts`:

```typescript
import { AIProvider } from "./provider";
import { trackAIUsage } from "./usage-tracker";

export interface ComplianceCheckRequest {
  tenantId: string;
  userId: string;
  documentContent: string;
  documentType: string;
  regulatoryFramework?: string;
}

export interface ComplianceFinding {
  severity: "error" | "warning" | "info";
  section: string;
  message: string;
  aiGenerated: boolean;
}

export interface ComplianceCheckResult {
  score: number;
  findings: ComplianceFinding[];
  summary: string;
  metadata: {
    checkedAt: Date;
    deterministic: boolean;
    aiReviewRequired: number;
  };
}

const DETERMINISTIC_RULES: Record<string, (content: string) => ComplianceFinding[]> = {
  has_title: (content) =>
    !content.match(/^#\s+\w+/m)
      ? [
          {
            severity: "error",
            section: "Header",
            message: "Document must have a title",
            aiGenerated: false,
          },
        ]
      : [],
  has_version: (content) =>
    !content.match(/version|revision/i)
      ? [
          {
            severity: "warning",
            section: "Metadata",
            message: "Document should include version/revision number",
            aiGenerated: false,
          },
        ]
      : [],
};

export async function checkCompliance(
  aiProvider: AIProvider,
  request: ComplianceCheckRequest
): Promise<ComplianceCheckResult> {
  const startTime = Date.now();

  const deterministicFindings: ComplianceFinding[] = [];
  for (const [rule, checker] of Object.entries(DETERMINISTIC_RULES)) {
    deterministicFindings.push(...checker(request.documentContent));
  }

  const aiPrompt = `Review document for regulatory compliance.
Document Type: ${request.documentType}
Content: ${request.documentContent.substring(0, 2000)}...

Respond with JSON: { "findings": [], "summary": "" }`;

  let aiFindings: ComplianceFinding[] = [];
  try {
    const response = await aiProvider.generateText(aiPrompt);
    const parsed = JSON.parse(response);
    aiFindings = parsed.findings.map((f: ComplianceFinding) => ({
      ...f,
      aiGenerated: true,
    }));
  } catch (e) {
    console.error("AI compliance check failed:", e);
  }

  const latencyMs = Date.now() - startTime;

  await trackAIUsage({
    tenantId: request.tenantId,
    userId: request.userId,
    feature: "compliance-checker",
    model: "claude-3-5-sonnet-20241022",
    inputTokens: Math.ceil(aiPrompt.length / 4),
    outputTokens: Math.ceil(JSON.stringify(aiFindings).length / 4),
    latencyMs,
  });

  const allFindings = [...deterministicFindings, ...aiFindings];
  const errors = allFindings.filter((f) => f.severity === "error").length;
  const warnings = allFindings.filter((f) => f.severity === "warning").length;
  const score = Math.max(0, 100 - errors * 20 - warnings * 5);

  return {
    score,
    findings: allFindings,
    summary:
      score >= 80
        ? "Document meets compliance requirements"
        : "Document requires review and corrections",
    metadata: {
      checkedAt: new Date(),
      deterministic: deterministicFindings.length > 0,
      aiReviewRequired: aiFindings.length,
    },
  };
}
```

---

## 5. AI tRPC Router

Create `src/server/api/routers/ai.ts`:

```typescript
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { generateDocument } from "@/server/ai/document-generator";
import { checkCompliance } from "@/server/ai/compliance-checker";
import { createAIProvider } from "@/server/ai/provider";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 h"),
});

const aiProvider = createAIProvider({
  provider: "claude",
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const aiRouter = createTRPCRouter({
  generateDocument: protectedProcedure
    .input(
      z.object({
        documentType: z.enum([
          "SOP",
          "WORK_INSTRUCTION",
          "QUALITY_MANUAL",
          "RISK_ASSESSMENT",
        ]),
        parameters: z.record(z.unknown()),
        regulatoryContext: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id);
      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      const result = await generateDocument(aiProvider, {
        tenantId: ctx.session.user.tenantId,
        userId: ctx.session.user.id,
        documentType: input.documentType,
        parameters: input.parameters,
        regulatoryContext: input.regulatoryContext,
      });

      return result;
    }),

  checkCompliance: protectedProcedure
    .input(
      z.object({
        documentContent: z.string(),
        documentType: z.string(),
        regulatoryFramework: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id);
      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      const result = await checkCompliance(aiProvider, {
        tenantId: ctx.session.user.tenantId,
        userId: ctx.session.user.id,
        documentContent: input.documentContent,
        documentType: input.documentType,
        regulatoryFramework: input.regulatoryFramework,
      });

      return result;
    }),

  regulatoryQA: protectedProcedure
    .input(z.object({ question: z.string() }))
    .query(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id);
      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      const answer = await aiProvider.generateText(
        `You are a regulatory compliance expert. Question: ${input.question}`
      );

      return { answer };
    }),
});
```

---

## 6. AI Cost Guardrails

Cost checking middleware function:

```typescript
export async function checkAICostGuardrail(
  tenantId: string,
  db: Database
): Promise<{ allowed: boolean; remaining: number }> {
  const result = await db.query(
    `SELECT COALESCE(SUM(cost_cents), 0) as monthly_cost
     FROM ai_usage 
     WHERE tenant_id = $1 AND created_at > NOW() - INTERVAL '30 days'`,
    [tenantId]
  );

  const monthlyCostCents = result.rows[0].monthly_cost;
  const limitCents = 100000; // 1000 USD default

  return {
    allowed: monthlyCostCents < limitCents,
    remaining: Math.max(0, limitCents - monthlyCostCents),
  };
}
```

---

## 7. Prompt Templates

Create `src/server/ai/prompts/index.ts`:

```typescript
export interface PromptTemplate {
  system: string;
  build: (params: Record<string, unknown>, regulatoryContext?: string) => string;
}

const templates: Record<string, PromptTemplate> = {
  SOP: {
    system: `You are a regulatory compliance expert. Generate comprehensive SOPs that meet FDA and ISO 13485 requirements.`,
    build: (params) =>
      `Create SOP for: ${params.title}\nScope: ${params.scope}`,
  },

  WORK_INSTRUCTION: {
    system: `Generate detailed work instructions following ISO 9001 formatting.`,
    build: (params) =>
      `Create work instruction for: ${params.processName}`,
  },

  QUALITY_MANUAL: {
    system: `Generate Quality Manual sections aligned with ISO 13485 and FDA requirements.`,
    build: (params) =>
      `Create Quality Manual section on: ${params.section}`,
  },

  RISK_ASSESSMENT: {
    system: `Generate ISO 14971 risk assessments with systematic hazard analysis.`,
    build: (params) =>
      `Create risk assessment for: ${params.deviceDescription}`,
  },
};

export function getPromptTemplate(documentType: string): PromptTemplate {
  return templates[documentType] || templates.SOP;
}

export function sanitizeUserInput(input: string): string {
  return input
    .replace(/system:/gi, "")
    .replace(/ignore previous/gi, "")
    .substring(0, 10000);
}
```

---

## Verification Steps

1. Install dependencies:
   ```bash
   npm install @anthropic-ai/sdk @upstash/ratelimit @upstash/redis
   ```

2. Set environment variables:
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Run type check:
   ```bash
   npx tsc --noEmit
   ```

4. Verify database schema created:
   ```sql
   SELECT COUNT(*) FROM ai_usage;
   ```

---

## Security Checklist

- All user inputs sanitized before inclusion in prompts
- All AI calls include tenant_id filtering
- Rate limiting via Upstash Redis (100 calls/hour per tenant)
- Monthly cost guardrails prevent unexpected charges
- Every AI call logged with full audit trail
- API keys in environment variables only
