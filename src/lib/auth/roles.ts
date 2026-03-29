export const APP_ROLES = [
  "super_admin",
  "admin",
  "sub_admin",
  "reseller"
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const INTERNAL_ROLES: AppRole[] = [
  "super_admin",
  "admin",
  "sub_admin"
];

export function isInternalRole(role: AppRole) {
  return INTERNAL_ROLES.includes(role);
}
