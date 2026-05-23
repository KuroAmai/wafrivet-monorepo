import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, { params }: Params) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const res = await gatewayFetch(`/vet/orders/${id}/cancel`, { method: "PATCH", json: {} });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
