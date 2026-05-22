import { NextResponse } from "next/server";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST(request: Request) {
  const body = await request.json();

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true") {
    return NextResponse.json({
      id: "mock-user",
      email: body.email,
      role: body.role ?? "farmer",
      isVerified: false,
      isActive: true,
    });
  }

  const res = await fetch(`${GATEWAY_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Signup failed", code: data.code },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
