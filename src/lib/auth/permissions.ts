import type { AppRole } from "@/lib/auth/roles";

const roleHierarchy: Record<AppRole, number> = {
  super_admin: 400,
  admin: 300,
  sub_admin: 200,
  reseller: 100
};

export function hasMinimumRole(currentRole: AppRole, requiredRole: AppRole) {
  return roleHierarchy[currentRole] >= roleHierarchy[requiredRole];
}

export function canManageResellers(role: AppRole) {
  return hasMinimumRole(role, "admin");
}

export function canManageWallet(role: AppRole) {
  return hasMinimumRole(role, "sub_admin");
}

export function canSellWarranty(role: AppRole) {
  return role === "reseller";
}

export function canRegenerateCertificate(role: AppRole) {
  return role !== "reseller";
}
