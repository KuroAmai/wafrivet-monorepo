import { withActor } from "@/lib/gatewayActor";
import { gatewayFetch } from "@/lib/gatewayAuth";
import {
  proxyGatewayResponse,
  requireGatewayAuth,
  requireGatewayToken,
} from "@/lib/shopGatewayResponse";

export async function GET(request: Request) {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const { searchParams } = new URL(request.url);
  const query = new URLSearchParams();
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");
  if (limit) query.set("limit", limit);
  if (cursor) query.set("cursor", cursor);

  const path = query.toString() ? `/shopper/wishlist?${query}` : "/shopper/wishlist";
  const res = await gatewayFetch(path);
  return proxyGatewayResponse(res);
}

export async function POST(request: Request) {
  const auth = await requireGatewayAuth();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = withActor(body, auth.userId);
  const res = await gatewayFetch("/shopper/wishlist", {
    method: "POST",
    json: payload,
  });
  return proxyGatewayResponse(res);
}

export async function DELETE() {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const res = await gatewayFetch("/shopper/wishlist", { method: "DELETE" });
  return proxyGatewayResponse(res);
}
