import type { NextResponse } from "next/server";

export const AUTH_COOKIE_NAME = "jwt";
export const AUTH_COOKIE_ALIASES = ["jwt", "token", "access_token"] as const;

const DEFAULT_PROD_DOMAIN = ".wafrivet.com";

function readServerDomain(): string | undefined {
  const fromEnv = process.env.AUTH_COOKIE_DOMAIN?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return DEFAULT_PROD_DOMAIN;
  return undefined;
}

function readClientDomain(): string | undefined {
  try {
    const fromEnv = process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?.trim();
    if (fromEnv) return fromEnv;
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as {
      env?: { NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?: string };
    };
    const url = im.env?.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?.trim();
    if (url) return url;
  } catch {
    /* noop */
  }
  return undefined;
}

/** Parent domain for shared sessions across *.wafrivet.com (server). */
export function getAuthCookieDomain(): string | undefined {
  return readServerDomain();
}

/** Parent domain for client-side cookie read/write (browser). */
export function getAuthCookieDomainClient(): string | undefined {
  return readClientDomain() ?? readServerDomain();
}

export type AuthCookieSetOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
  domain?: string;
};

export function getAuthCookieSetOptions(maxAge: number): AuthCookieSetOptions {
  const domain = getAuthCookieDomain();
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
    ...(domain ? { domain } : {}),
  };
}

export function getAuthCookieClearOptions(): AuthCookieSetOptions & { expires: Date } {
  const domain = getAuthCookieDomain();
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    ...(domain ? { domain } : {}),
  };
}

/** @deprecated Use getAuthCookieSetOptions / getAuthCookieClearOptions */
export function getCookieOptions() {
  const domain = getAuthCookieDomain() ?? DEFAULT_PROD_DOMAIN;
  return {
    httpOnly: false,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    domain,
  };
}

type CookieStoreLike = {
  set: (name: string, value: string, options?: Record<string, unknown>) => void;
  delete?: (name: string) => void;
};

export function applyAuthCookie(
  cookieStore: CookieStoreLike,
  token: string,
  maxAgeSeconds?: number,
): void {
  const maxAge = typeof maxAgeSeconds === "number" ? maxAgeSeconds : 3600;
  cookieStore.set(AUTH_COOKIE_NAME, token, getAuthCookieSetOptions(maxAge));
}

export function clearAuthCookiesOnStore(cookieStore: CookieStoreLike): void {
  const clearOpts = getAuthCookieClearOptions();
  const hostClear = {
    path: "/",
    maxAge: 0,
    expires: clearOpts.expires,
    httpOnly: false,
    secure: clearOpts.secure,
    sameSite: "lax" as const,
  };

  for (const name of AUTH_COOKIE_ALIASES) {
    cookieStore.set(name, "", clearOpts);
    cookieStore.set(name, "", hostClear);
    cookieStore.delete?.(name);
  }
}

export function clearAuthCookiesOnResponse(res: NextResponse): void {
  const clearOpts = getAuthCookieClearOptions();
  const hostClear = {
    path: "/",
    maxAge: 0,
    expires: clearOpts.expires,
    httpOnly: false,
    secure: clearOpts.secure,
    sameSite: "lax" as const,
  };

  for (const name of AUTH_COOKIE_ALIASES) {
    res.cookies.set(name, "", clearOpts);
    res.cookies.set(name, "", hostClear);
  }
}

export function formatAuthCookieClient(token: string, maxAgeSeconds?: number): string {
  const maxAge = maxAgeSeconds ?? 3600;
  const secure =
    typeof location !== "undefined" && location.protocol === "https:";
  const domain = getAuthCookieDomainClient();
  const domainPart = domain ? `; domain=${domain}` : "";
  return `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}${domainPart}`;
}

export function clearAuthCookieClient(): void {
  if (typeof document === "undefined") return;
  const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
  const domain = getAuthCookieDomainClient();
  const domains = [domain, ".wafrivet.com", ""].filter(
    (d, i, arr) => d !== undefined && arr.indexOf(d) === i,
  ) as string[];

  for (const name of AUTH_COOKIE_ALIASES) {
    for (const d of domains) {
      const domainPart = d ? `; domain=${d}` : "";
      document.cookie = `${name}=; path=/; expires=${expire}; max-age=0${domainPart}`;
    }
  }
}
