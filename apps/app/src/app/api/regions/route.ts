import { NextResponse } from "next/server";
import { gatewayFetch } from "@/lib/gatewayAuth";
import { MOCK_REGIONS } from "@/lib/mockAuthProfile";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "100";
  const cursor = searchParams.get("cursor");

  const token = await import("@/lib/gatewayAuth").then((m) => m.getGatewayToken());
  if (token === "mock-token") {
    return NextResponse.json({ data: MOCK_REGIONS });
  }

  const query = new URLSearchParams({ limit });
  if (cursor) query.set("cursor", cursor);

  const res = await gatewayFetch(`/regions?${query.toString()}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Could not load regions" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
