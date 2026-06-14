import { NextResponse } from "next/server";
import { GATEWAY_URL } from "@/lib/gateway";
import { getGatewayToken } from "@/lib/gatewayAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type");
  if (!contentType?.toLowerCase().includes("multipart/form-data")) {
    return NextResponse.json(
      { message: "Expected multipart/form-data upload" },
      { status: 415 },
    );
  }

  const body = await request.arrayBuffer();
  const res = await fetch(`${GATEWAY_URL}/supplier/profile/branding`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
    body,
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
