import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();

  if (token === "mock-token") {
    const { markMockProfileComplete } = await import("@/lib/mockAuthProfile");
    await markMockProfileComplete();
    return NextResponse.json({ ok: true, sessionId: id });
  }

  const res = await gatewayFetch(`/onboarding/${id}/submit`, {
    method: "POST",
    json: body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Could not complete onboarding" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
