import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { applyAuthCookie } from "@wafrivet/auth";
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

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Login failed", code: data.code },
      { status: res.status },
    );
  }

  const cookieStore = await cookies();
  const maxAge = typeof data.expiresIn === "number" ? data.expiresIn : 3600;
  applyAuthCookie(cookieStore, data.accessToken as string, maxAge);

  return NextResponse.json({
    ok: true,
    expiresIn: maxAge,
    accessToken: data.accessToken as string,
  });
}
