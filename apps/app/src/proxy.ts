import { getShopBaseUrl, normalizeUserRole } from "@wafrivet/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hubRedirectForJwtRole(jwtRole: string | undefined, request: NextRequest): URL {
  const productRole = normalizeUserRole(jwtRole);
  if (productRole === "customer") {
    return new URL(getShopBaseUrl());
  }
  return new URL("/welcome", request.url);
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value || request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/welcome";

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && token && token !== "mock-token") {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8"),
      ) as { role?: string };
      if (payload.role && payload.role !== "ADMIN") {
        return NextResponse.redirect(hubRedirectForJwtRole(payload.role, request));
      }
    } catch {
      /* allow through; API will enforce */
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/welcome", "/admin", "/admin/:path*"],
};
