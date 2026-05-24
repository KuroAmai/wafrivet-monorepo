import type { AuthMeDto } from "@wafrivet/types";

export function isAdminRole(role?: string | null): boolean {
  return role?.toUpperCase() === "ADMIN";
}

export function hasAdminAccess(roles: (string | undefined)[]): boolean {
  return roles.some((r) => isAdminRole(r));
}

export function extractRolesFromMe(me: AuthMeDto): string[] {
  const fromUser = me.user?.roles ?? [];
  const top = me.roles ?? [];
  const single = me.role ? [me.role] : [];
  return [...top, ...fromUser, ...single];
}

export function resolvePrimaryRole(roles: (string | undefined)[]): string | undefined {
  if (hasAdminAccess(roles)) return "ADMIN";
  return roles.find(Boolean);
}

export function extractRolesFromJwt(payload: {
  role?: string;
  roles?: string[];
}): string[] {
  const single = payload.role ? [payload.role] : [];
  const multi = payload.roles ?? [];
  return [...single, ...multi];
}

export function jwtHasAdminAccess(payload: { role?: string; roles?: string[] }): boolean {
  return hasAdminAccess(extractRolesFromJwt(payload));
}
