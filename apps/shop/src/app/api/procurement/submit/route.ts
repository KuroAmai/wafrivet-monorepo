import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

export async function POST() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const res = await gatewayFetch("/vet/procurement", { method: "POST", json: {} });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
