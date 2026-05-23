import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

const FALLBACK_REGIONS = [
  { id: "lagos", name: "Lagos", isActive: true, defaultDeliveryFee: 1500 },
  { id: "kano", name: "Kano", isActive: true, defaultDeliveryFee: 1200 },
  { id: "abuja", name: "Abuja", isActive: true, defaultDeliveryFee: 1500 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "100";
  const cursor = searchParams.get("cursor");

  const token = await getGatewayToken();
  if (token === "mock-token") {
    return NextResponse.json({ data: FALLBACK_REGIONS });
  }

  const query = new URLSearchParams({ limit });
  if (cursor) query.set("cursor", cursor);

  const res = await gatewayFetch(`/regions?${query.toString()}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: (data as { message?: string }).message ?? "Could not load regions" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
