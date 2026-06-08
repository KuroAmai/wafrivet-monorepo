import type { NextResponse } from "next/server";
import { getAuthCookieDomain } from "./authCookie";

/** Matches gateway `auth.refreshCookieName` default. */
export const REFRESH_COOKIE_NAME = "wf_refresh_token";

const DEFAULT_REFRESH_MAX_AGE_SEC = 60 * 60 * 24 * 30;

export function readGatewaySetCookies(res: Response): string[] {
  const headers = res.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }
  const single = res.headers.get("set-cookie");
  return single ? [single] : [];
}

export function parseRefreshCookieFromSetCookies(
  setCookies: string[],
  cookieName = REFRESH_COOKIE_NAME,
): { value: string; maxAge: number } | null {
  for (const header of setCookies) {
    const parts = header.split(";").map((part) => part.trim());
    const nameValue = parts[0] ?? "";
    const eq = nameValue.indexOf("=");
    if (eq === -1) continue;
    const name = nameValue.slice(0, eq);
    if (name !== cookieName) continue;

    let maxAge = DEFAULT_REFRESH_MAX_AGE_SEC;
    for (const part of parts.slice(1)) {
      const [key, rawValue] = part.split("=").map((segment) => segment.trim());
      if (key?.toLowerCase() === "max-age" && rawValue) {
        const parsed = Number.parseInt(rawValue, 10);
        if (Number.isFinite(parsed)) maxAge = parsed;
      }
    }

    return { value: nameValue.slice(eq + 1), maxAge };
  }
  return null;
}

export function getRefreshCookieSetOptions(maxAge: number) {
  const domain = getAuthCookieDomain();
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
    ...(domain ? { domain } : {}),
  };
}

type CookieStoreLike = {
  set: (name: string, value: string, options?: Record<string, unknown>) => void;
  delete?: (name: string) => void;
};

export function applyRefreshCookie(
  cookieStore: CookieStoreLike,
  refreshToken: string,
  maxAgeSeconds?: number,
): void {
  const maxAge = maxAgeSeconds ?? DEFAULT_REFRESH_MAX_AGE_SEC;
  cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieSetOptions(maxAge));
}

export function applyRefreshCookieOnResponse(
  response: NextResponse,
  refreshToken: string,
  maxAgeSeconds?: number,
): void {
  const maxAge = maxAgeSeconds ?? DEFAULT_REFRESH_MAX_AGE_SEC;
  response.cookies.set(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieSetOptions(maxAge));
}

export function clearRefreshCookiesOnStore(cookieStore: CookieStoreLike): void {
  const clearOpts = {
    ...getRefreshCookieSetOptions(0),
    maxAge: 0,
    expires: new Date(0),
  };
  const hostClear = {
    path: "/",
    maxAge: 0,
    expires: clearOpts.expires,
    httpOnly: true,
    secure: clearOpts.secure,
    sameSite: "lax" as const,
  };

  cookieStore.set(REFRESH_COOKIE_NAME, "", clearOpts);
  cookieStore.set(REFRESH_COOKIE_NAME, "", hostClear);
  cookieStore.delete?.(REFRESH_COOKIE_NAME);
}

export function clearRefreshCookiesOnResponse(res: NextResponse): void {
  const clearOpts = {
    ...getRefreshCookieSetOptions(0),
    maxAge: 0,
    expires: new Date(0),
  };
  const hostClear = {
    path: "/",
    maxAge: 0,
    expires: clearOpts.expires,
    httpOnly: true,
    secure: clearOpts.secure,
    sameSite: "lax" as const,
  };

  res.cookies.set(REFRESH_COOKIE_NAME, "", clearOpts);
  res.cookies.set(REFRESH_COOKIE_NAME, "", hostClear);
}
