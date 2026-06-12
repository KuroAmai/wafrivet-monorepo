import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { resolveProcurementPrefix } from "@/lib/procurementPrefix";

export async function GET(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const prefix = await resolveProcurementPrefix();
  if (!prefix) {
    return NextResponse.json({ message: "Commerce role required" }, { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const query = new URLSearchParams();
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");
  if (limit) query.set("limit", limit);
  if (cursor) query.set("cursor", cursor);

  const path = query.toString() ? `${prefix}/orders?${query}` : `${prefix}/orders`;
  const res = await gatewayFetch(path);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
