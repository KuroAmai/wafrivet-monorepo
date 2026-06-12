import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

export async function GET(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const path = query ? `/supplier/offers?${query}` : "/supplier/offers";
  const res = await gatewayFetch(path);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const res = await gatewayFetch("/supplier/offers", { method: "POST", json: body });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
