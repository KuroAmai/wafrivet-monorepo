import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";
import { applyMockRoleSelection } from "@/lib/mockAuthProfile";

export async function POST(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (token === "mock-token") {
    const mockUser = await applyMockRoleSelection(body.roles ?? []);
    const response = NextResponse.json({
      user: {
        id: "mock-user",
        roles: mockUser.roles,
        kyc_required_for: mockUser.kyc_required_for,
      },
    });
    return response;
  }

  const res = await gatewayFetch("/roles/select", {
    method: "POST",
    json: body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Could not select role" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
