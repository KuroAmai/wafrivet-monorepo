import { withActor } from "@/lib/gatewayActor";
import { gatewayFetch } from "@/lib/gatewayAuth";
import {
  proxyGatewayResponse,
  requireGatewayAuth,
  requireGatewayToken,
} from "@/lib/shopGatewayResponse";

export async function GET() {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const res = await gatewayFetch("/shopper/addresses");
  return proxyGatewayResponse(res);
}

export async function POST(request: Request) {
  const auth = await requireGatewayAuth();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = withActor(body, auth.userId);
  const res = await gatewayFetch("/shopper/addresses", {
    method: "POST",
    json: payload,
  });
  return proxyGatewayResponse(res);
}
