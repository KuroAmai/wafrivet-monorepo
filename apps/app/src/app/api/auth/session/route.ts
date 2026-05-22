import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { applyAuthCookie } from "@wafrivet/auth";

/** Sets a dev/mock session cookie with shared domain (when mock auth is enabled). */
export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH !== "true") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const token =
    typeof body.token === "string" && body.token.length > 0
      ? body.token
      : "mock-token";
  const maxAge = typeof body.expiresIn === "number" ? body.expiresIn : 3600;

  const cookieStore = await cookies();
  applyAuthCookie(cookieStore, token, maxAge);

  return NextResponse.json({ ok: true, expiresIn: maxAge, accessToken: token });
}
