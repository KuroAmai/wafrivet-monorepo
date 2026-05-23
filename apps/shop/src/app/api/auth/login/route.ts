import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  applyAuthCookie,
  getAuthCookieSetOptions,
} from "@wafrivet/auth";
import { extractAccessToken } from "@/lib/extractAccessToken";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email ?? body.emailOrPhone;
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true") {
    const cookieStore = await cookies();
    applyAuthCookie(cookieStore, "mock-token", 3600);
    return NextResponse.json({
      ok: true,
      expiresIn: 3600,
      accessToken: "mock-token",
    });
  }

  const res = await fetch(`${GATEWAY_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    return NextResponse.json(
      {
        message: (data.message as string | undefined) ?? "Login failed",
        code: data.code,
      },
      { status: res.status },
    );
  }

  const accessToken = extractAccessToken(data);
  if (!accessToken) {
    return NextResponse.json(
      { message: "Login succeeded but no access token was returned" },
      { status: 502 },
    );
  }

  const maxAge = typeof data.expiresIn === "number" ? data.expiresIn : 3600;
  const cookieStore = await cookies();
  applyAuthCookie(cookieStore, accessToken, maxAge);

  const response = NextResponse.json({
    ok: true,
    expiresIn: maxAge,
    accessToken,
  });
  response.cookies.set(AUTH_COOKIE_NAME, accessToken, getAuthCookieSetOptions(maxAge));
  return response;
}
