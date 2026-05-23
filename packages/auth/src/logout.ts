import { clearAuthCookieClient } from "./authCookie";
import { getCentralLoginUrl } from "./centralAuth";

function resolveLogoutHref(returnTo?: string): string {
  if (!returnTo) return getCentralLoginUrl();
  if (returnTo.startsWith("http://") || returnTo.startsWith("https://")) return returnTo;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${returnTo.startsWith("/") ? returnTo : `/${returnTo}`}`;
  }
  return returnTo;
}

/** @param returnTo — optional post-logout URL; defaults to app login. */
export function logoutClient(returnTo?: string): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  clearAuthCookieClient();
  try {
    sessionStorage.removeItem("wafrivet_roles_confirmed");
    sessionStorage.removeItem("wafrivet_onboarding_session");
    sessionStorage.removeItem("wafrivet_auth_return_to");
  } catch {
    /* noop */
  }
  if (typeof window !== "undefined" && window.location.hostname) {
    const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
    for (const name of ["jwt", "token", "access_token"] as const) {
      document.cookie = `${name}=; path=/; expires=${expire}; max-age=0`;
    }
  }
  window.location.href = resolveLogoutHref(returnTo);
}
