import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk keys are real (not placeholders)
const hasValidClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes("placeholder");

// Dynamic import: only use Clerk middleware when real keys are configured
let clerkMiddleware: any;
let createRouteMatcher: any;

if (hasValidClerkKeys) {
  try {
    const clerk = require("@clerk/nextjs/server");
    clerkMiddleware = clerk.clerkMiddleware;
    createRouteMatcher = clerk.createRouteMatcher;
  } catch {
    // Clerk not available
  }
}

const isPublicRoute = createRouteMatcher
  ? createRouteMatcher([
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/api/webhooks(.*)",
      "/api/health(.*)",
    ])
  : null;

export default function middleware(req: NextRequest) {
  // If Clerk is properly configured, use Clerk middleware
  if (clerkMiddleware && isPublicRoute) {
    return clerkMiddleware((auth: any, request: NextRequest) => {
      if (!isPublicRoute(request)) {
        auth().protect();
      }
    })(req, {} as any);
  }

  // Otherwise, pass through (dev mode with placeholder keys)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
