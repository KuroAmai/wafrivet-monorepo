import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { resolveProcurementPrefix } from "@/lib/procurementPrefix";

export async function POST(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const prefix = await resolveProcurementPrefix();
  if (!prefix) {
    return NextResponse.json({ message: "Commerce role required" }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const res = await gatewayFetch(`${prefix}/procurement`, { method: "POST", json: body });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
