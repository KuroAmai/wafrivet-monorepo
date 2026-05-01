import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value || request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protected paths that require authentication
  const protectedPaths = ["/checkout", "/profile", "/orders"];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/login` 
      : "https://app.wafrivet.com/login";
    
    // Append redirect param so user returns here after login
    const url = new URL(loginUrl, request.url);
    url.searchParams.set("redirect", request.url);
    
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
