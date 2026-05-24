import { gatewayFetch } from "@/lib/gatewayAuth";
import { proxyGatewayResponse, requireGatewayAuth, requireGatewayToken } from "@/lib/shopGatewayResponse";

export async function GET() {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const res = await gatewayFetch("/shopper/profile");
  return proxyGatewayResponse(res);
}

export async function PATCH(request: Request) {
  const auth = await requireGatewayAuth();
  if (auth instanceof Response) return auth;

  const body = await request.json().catch(() => ({}));
  const res = await gatewayFetch("/shopper/profile", {
    method: "PATCH",
    json: body,
  });
  return proxyGatewayResponse(res);
}
