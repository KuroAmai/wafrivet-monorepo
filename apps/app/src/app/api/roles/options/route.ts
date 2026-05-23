import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { MOCK_ROLE_OPTIONS } from "@/lib/mockAuthProfile";

export async function GET() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (token === "mock-token") {
    return NextResponse.json({ roles: MOCK_ROLE_OPTIONS });
  }

  const res = await gatewayFetch("/roles/options");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Could not load role options" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
