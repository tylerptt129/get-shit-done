import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Create postgres-js client
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create Drizzle instance with schema
export const db = drizzle(client, { schema });

// Tenant-scoped DB helper: sets RLS tenant context before queries
export async function withTenant(tenantId: string) {
  await client`SELECT set_config('app.current_tenant_id', ${tenantId}, true)`;
  return db;
}

export { client };
