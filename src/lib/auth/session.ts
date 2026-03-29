import type { AppRole } from "@/lib/auth/roles";

export type AppSession = {
  userId: string;
  organizationId: string | null;
  role: AppRole;
  email: string;
};

export function assertCanAccessPlatform(session: AppSession | null) {
  if (!session) {
    throw new Error("Authentication required.");
  }

  if (session.role === "reseller") {
    throw new Error("Forbidden.");
  }

  return session;
}
