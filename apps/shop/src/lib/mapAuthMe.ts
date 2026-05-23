import type { AuthMeDto, AuthUserProfileDto, UserRole } from "@wafrivet/types";

export function mapAuthMeToProfile(me: AuthMeDto): AuthUserProfileDto {
  const role = (me.role ?? me.roles?.[0] ?? me.user?.roles?.[0] ?? "REGULAR_CUSTOMER") as UserRole;
  const now = new Date().toISOString();

  return {
    id: me.id ?? me.user?.id ?? "",
    email: me.email ?? "",
    role,
    roles: (me.roles ?? me.user?.roles) as UserRole[] | undefined,
    isVerified: me.isVerified ?? true,
    isActive: me.isActive ?? true,
    createdAt: now,
    updatedAt: now,
    firstName: me.firstName ?? undefined,
    lastName: me.lastName ?? undefined,
  };
}

export function displayNameFromProfile(
  user: AuthUserProfileDto | AuthMeDto | null | undefined,
): string | null {
  if (!user) return null;
  const first = user.firstName?.trim();
  if (first) return first;
  const display = "displayName" in user ? user.displayName?.trim() : undefined;
  if (display) return display.split(/\s+/)[0] ?? display;
  const email = user.email?.trim();
  if (email?.includes("@")) return email.split("@")[0] ?? null;
  return null;
}
