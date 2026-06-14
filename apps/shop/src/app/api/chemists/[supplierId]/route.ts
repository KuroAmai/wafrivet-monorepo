import { NextResponse } from "next/server";
import { gatewayFetch } from "@/lib/gatewayAuth";

type Params = { params: Promise<{ supplierId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { supplierId } = await params;
  const res = await gatewayFetch(`/chemists/${supplierId}`);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
