const DEFAULT_APP_URL = "https://app.wafrivet.com";

function readAppUrlFromEnv(): string | undefined {
  try {
    const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
    if (fromEnv) return fromEnv.replace(/\/$/, "");
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as {
      env?: { NEXT_PUBLIC_APP_URL?: string };
    };
    const url = im.env?.NEXT_PUBLIC_APP_URL?.trim();
    if (url) return url.replace(/\/$/, "");
  } catch {
    /* noop */
  }
  return undefined;
}

export function getAppBaseUrl(): string {
  return readAppUrlFromEnv() ?? DEFAULT_APP_URL;
}

function isAllowedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1") return true;
  return host === "wafrivet.com" || host.endsWith(".wafrivet.com");
}

/** Validates full return URLs for cross-subdomain redirects (blocks open redirects). */
export function isAllowedReturnTo(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.length > 2048) return false;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    if (parsed.protocol === "http:" && !["localhost", "127.0.0.1"].includes(parsed.hostname)) {
      return false;
    }
    return isAllowedHostname(parsed.hostname);
  } catch {
    return false;
  }
}

export function getCentralLoginUrl(returnTo?: string | null): string {
  const base = `${getAppBaseUrl()}/login`;
  if (returnTo && isAllowedReturnTo(returnTo)) {
    return `${base}?returnTo=${encodeURIComponent(returnTo)}`;
  }
  return base;
}

export function getCentralSignupUrl(returnTo?: string | null): string {
  const base = `${getAppBaseUrl()}/signup`;
  if (returnTo && isAllowedReturnTo(returnTo)) {
    return `${base}?returnTo=${encodeURIComponent(returnTo)}`;
  }
  return base;
}
