import { NextResponse } from "next/server";
import { formatAuthError } from "@/lib/authApiErrors";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST(request: Request) {
  const body = await request.json();

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true") {
    return NextResponse.json({
      userId: "mock-security-company",
      status: "pending",
      isVerified: false,
    });
  }

  const res = await fetch(`${GATEWAY_URL}/auth/register-security-company`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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
