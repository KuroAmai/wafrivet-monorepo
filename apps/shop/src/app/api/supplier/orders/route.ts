import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

export async function GET(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const path = query ? `/supplier/orders?${query}` : "/supplier/orders";
  const res = await gatewayFetch(path);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
