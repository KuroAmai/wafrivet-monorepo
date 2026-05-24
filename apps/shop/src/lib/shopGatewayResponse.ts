import { NextResponse } from "next/server";
import { getGatewayUserId } from "@/lib/gatewayActor";
import { getGatewayToken } from "@/lib/gatewayAuth";

export async function proxyGatewayResponse(res: Response): Promise<NextResponse> {
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function requireGatewayToken(): Promise<{ token: string } | NextResponse> {
  const token = await getGatewayToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return { token };
}

/** Token + user id (for mutations that need actor). */
export async function requireGatewayAuth(): Promise<
  { userId: string } | NextResponse
> {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const userId = await getGatewayUserId();
  if (!userId) {
    return NextResponse.json({ message: "Could not resolve user" }, { status: 401 });
  }
  return { userId };
}
