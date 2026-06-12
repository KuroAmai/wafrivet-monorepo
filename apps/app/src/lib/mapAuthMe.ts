import type { AuthMeDto, AuthUserProfileDto, UserRole } from "@wafrivet/types";
import { extractRolesFromMe, resolvePrimaryRole } from "@wafrivet/auth";
import { pickPrimaryPlatformRole } from "@/lib/platformRoles";

export function mapAuthMeToProfile(me: AuthMeDto): AuthUserProfileDto {
  const mergedRoles = extractRolesFromMe(me);
  const role = (resolvePrimaryRole(mergedRoles) ??
    pickPrimaryPlatformRole(mergedRoles) ??
    "REGULAR_CUSTOMER") as UserRole;
  const roles = (me.roles ?? me.user?.roles ?? mergedRoles) as UserRole[] | undefined;
  const now = new Date().toISOString();

  return {
    id: me.id ?? me.user?.id ?? "",
    email: me.email ?? "",
    role,
    roles,
    isVerified: me.isVerified ?? true,
    isActive: me.isActive ?? true,
    createdAt: me.createdAt ?? now,
    updatedAt: now,
    firstName: me.firstName ?? undefined,
    lastName: me.lastName ?? undefined,
    displayName: me.displayName ?? undefined,
    avatarUrl: me.avatarUrl ?? undefined,
    phone: me.phone ?? undefined,
  };
}
