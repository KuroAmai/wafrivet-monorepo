import { NextResponse, type NextRequest } from "next/server";
import { clearAuthCookiesOnResponse } from "@wafrivet/auth";

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const res = NextResponse.redirect(loginUrl);
  clearAuthCookiesOnResponse(res);
  return res;
}
