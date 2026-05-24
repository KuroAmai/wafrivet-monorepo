import { gatewayFetch } from "@/lib/gatewayAuth";
import { proxyGatewayResponse, requireGatewayToken } from "@/lib/shopGatewayResponse";

type Params = { params: Promise<{ masterSkuId: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const { masterSkuId } = await params;
  const res = await gatewayFetch(`/shopper/wishlist/${encodeURIComponent(masterSkuId)}`, {
    method: "DELETE",
  });
  return proxyGatewayResponse(res);
}
