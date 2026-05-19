const TOKEN_COOKIE = "jwt";
const TOKEN_KEY = "wafrivet_access_token";

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
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
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
  document.cookie = `${TOKEN_COOKIE}=; path=/; expires=${expire}; max-age=0`;
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
