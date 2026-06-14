import { NextRequest, NextResponse } from "next/server";
import { gatewayFetch } from "@/lib/gatewayAuth";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.toString();
  const path = search ? `/chemists?${search}` : "/chemists";
  const res = await gatewayFetch(path);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
