const TOKEN_COOKIE = "jwt";
const TOKEN_KEY = "wafrivet_access_token";

function getClientCookieDomain(): string | undefined {
  try {
    const fromEnv = process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?.trim();
    if (fromEnv) return fromEnv;
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as {
      env?: { NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?: string; VITE_AUTH_COOKIE_DOMAIN?: string };
    };
    const fromVite = im.env?.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?.trim();
    if (fromVite) return fromVite;
    const viteAuthDomain = im.env?.VITE_AUTH_COOKIE_DOMAIN?.trim();
    if (viteAuthDomain) return viteAuthDomain;
  } catch {
    /* noop */
  }
  if (typeof location !== "undefined") {
    const host = location.hostname.toLowerCase();
    if (host === "wafrivet.com" || host.endsWith(".wafrivet.com")) {
      return ".wafrivet.com";
    }
  }
  return undefined;
}

let memoryToken: string | null = null;

export function getAccessToken(): string | null {
  if (memoryToken) return memoryToken;
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setAccessToken(token: string, maxAgeSeconds?: number): void {
  memoryToken = token;
  if (typeof document === "undefined") return;
  const maxAge = maxAgeSeconds ?? 3600;
  const secure = typeof location !== "undefined" && location.protocol === "https:";
  const domain = getClientCookieDomain();
  const domainPart = domain ? `; domain=${domain}` : "";
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}${domainPart}`;
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* noop */
  }
}

export function clearAccessToken(): void {
  memoryToken = null;
  if (typeof document === "undefined") return;
  const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
  const domain = getClientCookieDomain();
  const domains = [domain, ".wafrivet.com", ""].filter(
    (d, i, arr) => d !== undefined && arr.indexOf(d) === i,
  ) as string[];
  for (const d of domains) {
    const domainPart = d ? `; domain=${d}` : "";
    document.cookie = `${TOKEN_COOKIE}=; path=/; expires=${expire}; max-age=0${domainPart}`;
  }
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* noop */
  }
}

export function hydrateTokenFromSession(): void {
  if (memoryToken) return;
  try {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (stored) memoryToken = stored;
  } catch {
    /* noop */
  }
}
