import { NextResponse } from "next/server";
import type { DraftCartDto } from "@wafrivet/types";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { resolveProcurementPrefix } from "@/lib/procurementPrefix";

const EMPTY_DRAFT: DraftCartDto = {
  supplierGroups: [],
  deliveryFee: { consolidatedTotal: 0 },
};

export async function GET() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const prefix = await resolveProcurementPrefix();
  if (!prefix) {
    return NextResponse.json(EMPTY_DRAFT);
  }

  try {
    const res = await gatewayFetch(`${prefix}/procurement/draft`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(EMPTY_DRAFT);
      }
      return NextResponse.json(data, { status: res.status });
    }
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Failed to load cart draft" }, { status: 500 });
  }
}

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
  const res = await gatewayFetch(`${prefix}/procurement/draft`, {
    method: "POST",
    json: body,
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const prefix = await resolveProcurementPrefix();
  if (!prefix) {
    return new NextResponse(null, { status: 204 });
  }

  const res = await gatewayFetch(`${prefix}/procurement/draft`, { method: "DELETE" });
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
