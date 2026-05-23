/** Chemist console routes (require authentication). */
export const CHEMIST_PROTECTED_PREFIXES = [
  "/dashboard",
  "/inventory",
  "/earnings",
  "/insights",
  "/support",
  "/settings",
] as const;

export const DISTRIBUTOR_PROTECTED_PREFIX = "/distributor";

export const CUSTOMER_PROTECTED_PREFIXES = ["/checkout", "/profile"] as const;

export function isChemistConsolePath(pathname: string): boolean {
  return CHEMIST_PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function isDistributorConsolePath(pathname: string): boolean {
  return (
    pathname === DISTRIBUTOR_PROTECTED_PREFIX ||
    pathname.startsWith(`${DISTRIBUTOR_PROTECTED_PREFIX}/`)
  );
}

export function isCustomerProtectedPath(pathname: string): boolean {
  return CUSTOMER_PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}
