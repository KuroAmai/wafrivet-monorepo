import { NextRequest, NextResponse } from "next/server";
import { gatewayFetch } from "@/lib/gatewayAuth";

type Params = { params: Promise<{ supplierId: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { supplierId } = await params;
  const search = request.nextUrl.searchParams.toString();
  const path = search
    ? `/chemists/${supplierId}/offers?${search}`
    : `/chemists/${supplierId}/offers`;
  const res = await gatewayFetch(path);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
