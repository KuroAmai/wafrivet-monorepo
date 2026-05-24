import { NextResponse } from "next/server";
import type { AuthMeDto } from "@wafrivet/types";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { mapAuthMeToProfile } from "@/lib/mapAuthMe";
import { getMockAuthMe } from "@/lib/mockAuthProfile";

export async function GET() {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "No session cookie" }, { status: 401 });
  }

  if (token === "mock-token") {
    const mock = await getMockAuthMe();
    return NextResponse.json(mapAuthMeToProfile(mock as AuthMeDto));
  }

  const res = await gatewayFetch("/auth/me");
  const data = (await res.json().catch(() => ({}))) as AuthMeDto;
  if (!res.ok) {
    return NextResponse.json(
      { message: (data as { message?: string }).message ?? "Failed to load profile" },
      { status: res.status },
    );
  }
  return NextResponse.json(mapAuthMeToProfile(data));
}
