import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { resolveProcurementPrefix } from "@/lib/procurementPrefix";

export async function GET() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const prefix = await resolveProcurementPrefix();
  if (!prefix) {
    return NextResponse.json({ message: "Commerce role required" }, { status: 403 });
  }
  const res = await gatewayFetch(`${prefix}/procurement/draft`);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
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
    return NextResponse.json({ message: "Commerce role required" }, { status: 403 });
  }
  const res = await gatewayFetch(`${prefix}/procurement/draft`, { method: "DELETE" });
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
