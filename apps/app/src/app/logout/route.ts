import { NextResponse, type NextRequest } from "next/server";
import { getCookieOptions } from "@wafrivet/auth";

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const res = NextResponse.redirect(loginUrl);
  const expirePast = new Date(0);
  const withDomain = { ...getCookieOptions(), maxAge: 0, expires: expirePast };
  const withoutDomain = { path: "/", maxAge: 0, expires: expirePast } as const;

  for (const name of ["jwt", "token"] as const) {
    res.cookies.set(name, "", withDomain);
    res.cookies.set(name, "", withoutDomain);
  }

  return res;
}
