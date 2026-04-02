import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "@/server/db";
import { tenants, users } from "@/server/db/schema";

type ClerkWebhookEvent = {
  type: string;
  data: Record<string, any>;
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new Response("Missing webhook secret", { status: 500 });
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Verification failed", { status: 400 });
  }

  // Auto-create tenant on organization.created
  if (evt.type === "organization.created") {
    const { id, name, slug } = evt.data;
    await db.insert(tenants).values({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      clerkOrgId: id,
    }).onConflictDoNothing();

    console.log(`Tenant created for org: ${name}`);
  }

  // Sync user on user.created
  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;
    if (primaryEmail) {
      await db.insert(users).values({
        clerkUserId: id,
        email: primaryEmail,
        name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
        avatar: image_url,
        tenantId: "default",
        role: "viewer",
      }).onConflictDoNothing();
    }
  }

  return new Response("OK", { status: 200 });
}
