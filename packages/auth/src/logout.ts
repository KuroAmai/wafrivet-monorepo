function getAppLoginUrl(): string {
  let base = "https://app.wafrivet.com";
  try {
    if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_APP_URL) {
      base = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
    }
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as { env?: { NEXT_PUBLIC_APP_URL?: string } };
    const url = im.env?.NEXT_PUBLIC_APP_URL;
    if (url) {
      base = url.replace(/\/$/, "");
    }
  } catch {
    /* noop */
  }
  return `${base}/login`;
}

function resolveLogoutHref(returnTo?: string): string {
  if (!returnTo) return getAppLoginUrl();
  if (returnTo.startsWith("http://") || returnTo.startsWith("https://")) return returnTo;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${returnTo.startsWith("/") ? returnTo : `/${returnTo}`}`;
  }
  return returnTo;
}

import { clearAuthCookieClient } from "./authCookie";

/** @param returnTo — e.g. `/login` on Shop; omit to send users to main app login. */
export function logoutClient(returnTo?: string): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  clearAuthCookieClient();
  try {
    sessionStorage.removeItem("wafrivet_roles_confirmed");
    sessionStorage.removeItem("wafrivet_onboarding_session");
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
