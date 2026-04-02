import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { users, tenants } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
  const { userId, orgId } = auth();
  if (!userId) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId))
    .limit(1);

  return user ?? null;
}

export async function getCurrentTenant() {
  const { orgId } = auth();
  if (!orgId) return null;

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  return tenant ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireTenant() {
  const tenant = await getCurrentTenant();
  if (!tenant) throw new Error("No organization selected");
  return tenant;
}
