import { withActor } from "@/lib/gatewayActor";
import { gatewayFetch } from "@/lib/gatewayAuth";
import { proxyGatewayResponse, requireGatewayAuth } from "@/lib/shopGatewayResponse";

export async function PATCH(request: Request) {
  const auth = await requireGatewayAuth();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = withActor(body, auth.userId);
  const res = await gatewayFetch("/shopper/profile/username", {
    method: "PATCH",
    json: payload,
  });
  return proxyGatewayResponse(res);
}
