import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isChemistConsolePath,
  isCustomerProtectedPath,
  isDistributorConsolePath,
} from "@/lib/authPaths";

function requiresAuth(pathname: string): boolean {
  if (pathname === "/login") return false;
  return (
    isCustomerProtectedPath(pathname) ||
    isChemistConsolePath(pathname) ||
    isDistributorConsolePath(pathname)
  );
}

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value || request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (requiresAuth(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
