import { NextResponse } from "next/server";
import { gatewayFetchMultipart } from "@/lib/gatewayMultipart";
import { getGatewayToken } from "@/lib/gatewayAuth";

export async function POST(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const res = await gatewayFetchMultipart("/supplier/profile/branding", formData);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
