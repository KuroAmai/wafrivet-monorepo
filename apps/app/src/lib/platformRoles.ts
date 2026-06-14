import type { GatewayOnboardingRole, PlatformSelectableRole } from "@wafrivet/types";
import type { UserRole } from "@wafrivet/auth";

const PLATFORM_TO_PRODUCT: Record<PlatformSelectableRole, UserRole> = {
  FARMER: "farmer",
  REGULAR_CUSTOMER: "customer",
  VET: "vet",
  SUPPLIER: "chemist",
  MANUFACTURER: "distributor",
};

const PRODUCT_TO_PLATFORM: Partial<Record<UserRole, PlatformSelectableRole>> = {
  farmer: "FARMER",
  customer: "REGULAR_CUSTOMER",
  vet: "VET",
  chemist: "SUPPLIER",
  distributor: "MANUFACTURER",
};

export function platformRoleToProductRole(role: PlatformSelectableRole): UserRole {
  return PLATFORM_TO_PRODUCT[role];
}

export function productRoleToPlatformRole(role: UserRole): PlatformSelectableRole | null {
  return PRODUCT_TO_PLATFORM[role] ?? null;
}

export function platformRoleToKycRole(
  role: PlatformSelectableRole,
): GatewayOnboardingRole | null {
  if (role === "VET" || role === "SUPPLIER" || role === "MANUFACTURER") {
    return role;
  }
  return null;
}

const ROLE_PRIORITY: PlatformSelectableRole[] = [
  "SUPPLIER",
  "MANUFACTURER",
  "VET",
  "FARMER",
  "REGULAR_CUSTOMER",
];

export function normalizePlatformRoles(roles: (string | undefined)[]): PlatformSelectableRole[] {
  const out = new Set<PlatformSelectableRole>();
  for (const raw of roles) {
    if (!raw) continue;
    const key = raw.toUpperCase() as PlatformSelectableRole;
    if (key in PLATFORM_TO_PRODUCT) {
      out.add(key);
    }
  }
  return [...out];
}

export function pickPrimaryPlatformRole(
  roles: (string | undefined)[],
): PlatformSelectableRole | null {
  const normalized = normalizePlatformRoles(roles);
  for (const candidate of ROLE_PRIORITY) {
    if (normalized.includes(candidate)) return candidate;
  }
  return null;
}

export function pickPrimaryProductRole(roles: (string | undefined)[]): UserRole | null {
  const upper = roles.map((role) => role?.toUpperCase()).filter(Boolean) as string[];
  if (upper.includes("SECURITY_COMPANY")) {
    return "security_company";
  }
  const platform = pickPrimaryPlatformRole(roles);
  if (!platform) return null;
  return platformRoleToProductRole(platform);
}

export function resolveKycRoleForSelection(
  selected: PlatformSelectableRole,
  kycRequired: GatewayOnboardingRole[],
): GatewayOnboardingRole {
  const match = platformRoleToKycRole(selected);
  if (match && kycRequired.includes(match)) {
    return match;
  }
  return kycRequired[0] ?? "VET";
}
