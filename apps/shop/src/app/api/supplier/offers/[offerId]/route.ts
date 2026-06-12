import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

type Params = { params: Promise<{ offerId: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { offerId } = await params;
  const body = await request.json().catch(() => ({}));
  const res = await gatewayFetch(`/supplier/offers/${offerId}`, { method: "PATCH", json: body });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_request: Request, { params }: Params) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { offerId } = await params;
  const res = await gatewayFetch(`/supplier/offers/${offerId}`, { method: "DELETE" });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
