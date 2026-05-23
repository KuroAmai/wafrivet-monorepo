import { NextResponse } from "next/server";
import { gatewayFetch, getGatewayToken } from "@/lib/gatewayAuth";

export async function PATCH(request: Request) {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (token === "mock-token") {
    const { markMockProfileSaved } = await import("@/lib/mockAuthProfile");
    await markMockProfileSaved();
    return NextResponse.json({ ok: true, ...body });
  }

  const res = await gatewayFetch("/users/profile", {
    method: "PATCH",
    json: body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "Could not update profile" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
