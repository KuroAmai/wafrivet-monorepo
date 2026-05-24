import { NextResponse } from "next/server";
import { formatAuthError } from "@/lib/authApiErrors";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST(request: Request) {
  const body = await request.json();

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true") {
    return NextResponse.json({
      id: "mock-user",
      email: body.email,
      isVerified: false,
      isActive: true,
    });
  }

  const { role: _role, ...signupBody } = body as Record<string, unknown>;

  const res = await fetch(`${GATEWAY_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupBody),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const formatted = formatAuthError(data, res.status, { operation: "signup" });
    return NextResponse.json(
      {
        message: formatted.message,
        code: formatted.code,
        fieldErrors: formatted.fieldErrors,
      },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
