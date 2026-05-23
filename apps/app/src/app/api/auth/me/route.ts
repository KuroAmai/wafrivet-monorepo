import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { getMockAuthMe } from "@/lib/mockAuthProfile";

export async function GET() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (token === "mock-token") {
    return NextResponse.json(await getMockAuthMe());
  }

  const res = await gatewayFetch("/auth/me");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Failed to load profile" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
