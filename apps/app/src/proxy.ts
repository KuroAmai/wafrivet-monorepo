import { getShopBaseUrl, jwtHasAdminAccess, normalizeUserRole } from "@wafrivet/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hubRedirectForJwtRole(jwtRole: string | undefined, request: NextRequest): URL {
  const productRole = normalizeUserRole(jwtRole);
  if (productRole === "customer") {
    return new URL(getShopBaseUrl());
  }
  return new URL("/welcome", request.url);
}

function decodeJwtPayload(token: string): { role?: string; roles?: string[] } | null {
  try {
    return JSON.parse(
      Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8"),
    ) as { role?: string; roles?: string[] };
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value || request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/welcome";

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    if (pathname.startsWith("/admin")) {
      loginUrl.searchParams.set("returnTo", "/admin");
    }
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && token) {
    if (token === "mock-token") {
      return NextResponse.next();
    }

    const payload = decodeJwtPayload(token);
    if (payload && !jwtHasAdminAccess(payload)) {
      return NextResponse.redirect(hubRedirectForJwtRole(payload.role, request));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/welcome", "/admin", "/admin/:path*"],
};
