import type { AuthMeDto, AuthUserProfileDto, UserRole } from "@wafrivet/types";

export function mapAuthMeToProfile(me: AuthMeDto): AuthUserProfileDto {
  const role = (me.role ?? me.roles?.[0] ?? me.user?.roles?.[0] ?? "REGULAR_CUSTOMER") as UserRole;
  const roles = (me.roles ?? me.user?.roles) as UserRole[] | undefined;
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

type ProfileLike = {
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  email?: string;
  role?: string;
  roles?: string[];
} | null | undefined;

export function displayNameFromProfile(user: ProfileLike): string | null {
  if (!user) return null;
  const first = user.firstName?.trim();
  if (first) return first;
  const display = "displayName" in user ? user.displayName?.trim() : undefined;
  if (display) return display.split(/\s+/)[0] ?? display;
  const email = user.email?.trim();
  if (email?.includes("@")) return email.split("@")[0] ?? null;
  return null;
}

export function fullNameFromProfile(user: ProfileLike): string | null {
  if (!user) return null;
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();
  if (first && last) return `${first} ${last}`;
  if (first) return first;
  const display = "displayName" in user ? user.displayName?.trim() : undefined;
  if (display) return display;
  return displayNameFromProfile(user);
}

export function formatMemberSince(createdAt?: string): string | null {
  if (!createdAt) return null;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
