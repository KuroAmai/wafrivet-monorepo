import { resolvePrimaryRole } from "./adminRole";
import { isAllowedReturnTo } from "./centralAuth";
import { normalizeUserRole } from "./normalizeRole";
import { redirectByRole, type UserRole } from "./redirectByRole";

function readHerdUrlFromEnv(): string {
  try {
    const fromEnv = process.env.NEXT_PUBLIC_HERD_URL?.trim();
    if (fromEnv) return fromEnv.replace(/\/$/, "");
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as { env?: { NEXT_PUBLIC_HERD_URL?: string } };
    const url = im.env?.NEXT_PUBLIC_HERD_URL?.trim();
    if (url) return url.replace(/\/$/, "");
  } catch {
    /* noop */
  }
  return "https://herd.wafrivet.com";
}

export function getHerdBaseUrl(): string {
  return readHerdUrlFromEnv();
}

function hostnameForProduct(hostname: string, product: "herd" | "shop" | "app"): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1") return true;

  if (product === "herd") {
    return host === "herd.wafrivet.com" || host.startsWith("herd.");
  }
  if (product === "shop") {
    return host === "shop.wafrivet.com" || host.startsWith("shop.");
  }
  return host === "app.wafrivet.com" || host === "wafrivet.com" || host.startsWith("app.");
}

/** Maps JWT/API roles to product role using server-side priority (SUPPLIER before FARMER). */
export function resolveProductRoleFromRoles(roles: (string | undefined)[]): UserRole | null {
  const upper = roles.map((role) => role?.toUpperCase()).filter(Boolean);
  if (upper.includes("SECURITY_COMPANY")) {
    return "security_company";
  }
  return normalizeUserRole(resolvePrimaryRole(roles));
}

/** True when a stored returnTo URL is appropriate for the user's product role. */
export function returnToMatchesRole(returnTo: string | null | undefined, role: UserRole | null): boolean {
  if (!returnTo || !role) return false;

  if (returnTo.startsWith("/") && !returnTo.startsWith("//")) {
    return true;
  }

  if (!isAllowedReturnTo(returnTo)) return false;

  try {
    const parsed = new URL(returnTo);
    const host = parsed.hostname;

    switch (role) {
      case "chemist":
      case "distributor":
        return hostnameForProduct(host, "shop");
      case "farmer":
      case "vet":
      case "security_company":
        return hostnameForProduct(host, "herd");
      case "customer":
        return hostnameForProduct(host, "shop");
      case "admin":
        return (
          hostnameForProduct(host, "app") &&
          (parsed.pathname.startsWith("/admin") ||
            parsed.pathname === "/" ||
            parsed.pathname.startsWith("/dashboard"))
        );
      default:
        return hostnameForProduct(host, "app");
    }
  } catch {
    return false;
  }
}

/** Default cross-app entry for a product role (used when returnTo is rejected). */
export function defaultDestinationForRole(role: UserRole): string {
  return redirectByRole(role);
}
