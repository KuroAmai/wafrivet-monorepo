import { NextResponse } from "next/server";
import { formatAuthError } from "@/lib/authApiErrors";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const res = await fetch(`${GATEWAY_URL}/auth/resend-verification-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const formatted = formatAuthError(data, res.status, { operation: "resendVerificationEmail" });
    return NextResponse.json(
      { message: formatted.message, code: formatted.code },
      { status: res.status },
    );
  }

  return NextResponse.json(data);
}
