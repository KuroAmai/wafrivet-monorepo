import { withActor } from "@/lib/gatewayActor";
import { gatewayFetch } from "@/lib/gatewayAuth";
import { proxyGatewayResponse, requireGatewayAuth } from "@/lib/shopGatewayResponse";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, { params }: Params) {
  const auth = await requireGatewayAuth();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const res = await gatewayFetch(`/shopper/addresses/${id}/default`, {
    method: "PATCH",
    json: withActor({}, auth.userId),
  });
  return proxyGatewayResponse(res);
}
