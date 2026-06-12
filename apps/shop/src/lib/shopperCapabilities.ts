import type { UserRole } from "@wafrivet/types";

const VET_COMMERCE_ROLES: UserRole[] = ["VET"];
const SHOPPER_COMMERCE_ROLES: UserRole[] = ["REGULAR_CUSTOMER", "FARMER"];
const SERVER_COMMERCE_ROLES: UserRole[] = [...VET_COMMERCE_ROLES, ...SHOPPER_COMMERCE_ROLES];
const NOTIFICATION_ROLES: UserRole[] = ["VET", "SUPPLIER", "RIDER"];

export function normalizeGatewayRoles(
  roles?: (UserRole | string)[] | null,
  primary?: UserRole | string | null,
): UserRole[] {
  const set = new Set<UserRole>();
  for (const r of roles ?? []) {
    if (typeof r === "string") set.add(r.toUpperCase() as UserRole);
  }
  if (primary && typeof primary === "string") {
    set.add(primary.toUpperCase() as UserRole);
  }
  return [...set];
}

export function canUseVetCommerce(roles?: (UserRole | string)[] | null, primary?: UserRole | string | null): boolean {
  const normalized = normalizeGatewayRoles(roles, primary);
  return normalized.some((r) => VET_COMMERCE_ROLES.includes(r));
}

export function canUseShopperCommerce(
  roles?: (UserRole | string)[] | null,
  primary?: UserRole | string | null,
): boolean {
  const normalized = normalizeGatewayRoles(roles, primary);
  return normalized.some((r) => SHOPPER_COMMERCE_ROLES.includes(r));
}

export function canUseServerCommerce(
  roles?: (UserRole | string)[] | null,
  primary?: UserRole | string | null,
): boolean {
  const normalized = normalizeGatewayRoles(roles, primary);
  return normalized.some((r) => SERVER_COMMERCE_ROLES.includes(r));
}

export function canUseNotifications(roles?: (UserRole | string)[] | null, primary?: UserRole | string | null): boolean {
  const normalized = normalizeGatewayRoles(roles, primary);
  return normalized.some((r) => NOTIFICATION_ROLES.includes(r));
}

export function isRegularCustomerOnly(roles?: (UserRole | string)[] | null, primary?: UserRole | string | null): boolean {
  const normalized = normalizeGatewayRoles(roles, primary);
  return normalized.length > 0 && normalized.every((r) => r === "REGULAR_CUSTOMER" || r === "PERSON");
}
