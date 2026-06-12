import { NextResponse } from "next/server";
import { gatewayFetch } from "@/lib/gatewayAuth";

type Params = { params: Promise<{ masterSkuId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { masterSkuId } = await params;
  const res = await gatewayFetch(`/market/range/${masterSkuId}`);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
