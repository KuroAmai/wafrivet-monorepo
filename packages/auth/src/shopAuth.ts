import { getCentralLoginUrl, isAllowedReturnTo } from "./centralAuth";
import { normalizeUserRole } from "./normalizeRole";
import type { UserRole } from "./redirectByRole";

export function getShopBaseUrl(): string {
  try {
    if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SHOP_URL) {
      return process.env.NEXT_PUBLIC_SHOP_URL.replace(/\/$/, "");
    }
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as { env?: { NEXT_PUBLIC_SHOP_URL?: string } };
    const url = im.env?.NEXT_PUBLIC_SHOP_URL;
    if (url) return url.replace(/\/$/, "");
  } catch {
    /* noop */
  }
  return "https://shop.wafrivet.com";
}

/** Safe in-app path for post-login redirect (blocks open redirects). */
export function sanitizeShopRedirect(path: string | null | undefined): string | null {
  if (!path || typeof path !== "string") return null;
  const trimmed = path.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  if (trimmed.includes(":")) return null;
  if (trimmed.length > 256) return null;
  return trimmed;
}

/**
 * Central app login with returnTo set to a shop URL (path or full URL).
 * `absolute` is kept for API compatibility; return value is always an absolute app URL.
 */
export function getShopLoginUrl(redirectPath?: string, _absolute = false): string {
  const shopBase = getShopBaseUrl();
  let returnTo = shopBase;
  if (redirectPath) {
    const trimmed = redirectPath.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      if (isAllowedReturnTo(trimmed)) returnTo = trimmed;
    } else {
      const safe = sanitizeShopRedirect(trimmed);
      if (safe) returnTo = `${shopBase}${safe}`;
    }
  }
  return getCentralLoginUrl(returnTo);
}

/** Post-signup / cross-app entry when shared `.wafrivet.com` cookie is set. */
export function getShopEntryUrl(role: UserRole): string {
  const shopUrl = getShopBaseUrl();
  switch (role) {
    case "chemist":
      return `${shopUrl}/dashboard`;
    case "distributor":
      return `${shopUrl}/distributor`;
    default:
      return shopUrl;
  }
}

/** Default landing path on Shop after login when no `redirect` query is set. */
export function getShopPostLoginPath(role: UserRole | null): string {
  switch (role) {
    case "chemist":
      return "/dashboard";
    case "distributor":
      return "/distributor";
    case "admin":
      return "/dashboard";
    default:
      return "/";
  }
}

export function resolvePostLoginPath(
  role: UserRole | null,
  redirectParam: string | null | undefined,
): string {
  const fromQuery = sanitizeShopRedirect(redirectParam);
  if (fromQuery) return fromQuery;
  return getShopPostLoginPath(role);
}

export function resolvePostLoginPathFromJwt(
  jwtRole: string | undefined,
  redirectParam: string | null | undefined,
): string {
  return resolvePostLoginPath(normalizeUserRole(jwtRole), redirectParam);
}
