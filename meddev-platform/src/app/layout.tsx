import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedDev QMS Platform",
  description: "FDA/ISO 13485-compliant Quality Management System for Medical Devices",
};

function ConditionalClerkProvider({ children }: { children: React.ReactNode }) {
  // Only wrap with ClerkProvider when real keys are configured
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const hasRealKey = key && key.startsWith("pk_") && !key.includes("placeholder");

  if (hasRealKey) {
    // Dynamic require to avoid error when key is invalid
    const { ClerkProvider } = require("@clerk/nextjs");
    return <ClerkProvider>{children}</ClerkProvider>;
  }

  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ConditionalClerkProvider>{children}</ConditionalClerkProvider>
      </body>
    </html>
  );
}
