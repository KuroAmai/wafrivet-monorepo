import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

export async function POST(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (token === "mock-token") {
    return NextResponse.json({
      id: "mock-onboarding-session",
      role: body.role,
      status: "started",
    });
  }

  const res = await gatewayFetch("/onboarding/start", {
    method: "POST",
    json: body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Could not start onboarding" },
      { status: res.status },
    );
  }
  return NextResponse.json({
    ...data,
    id: data.id ?? data.onboardingId ?? data.sessionId,
  });
}
