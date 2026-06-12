import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { resolveProcurementPrefix } from "@/lib/procurementPrefix";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const prefix = await resolveProcurementPrefix();
  if (!prefix) {
    return NextResponse.json({ message: "Commerce role required" }, { status: 403 });
  }
  const { id } = await params;
  const res = await gatewayFetch(`${prefix}/orders/${id}`);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
