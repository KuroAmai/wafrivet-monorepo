import { NextResponse } from "next/server";
import { GATEWAY_URL } from "@/lib/gateway";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${GATEWAY_URL}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Verification failed" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
