import { withActor } from "@/lib/gatewayActor";
import { gatewayFetch } from "@/lib/gatewayAuth";
import {
  proxyGatewayResponse,
  requireGatewayAuth,
  requireGatewayToken,
} from "@/lib/shopGatewayResponse";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const { id } = await params;
  const res = await gatewayFetch(`/shopper/addresses/${id}`);
  return proxyGatewayResponse(res);
}

export async function PUT(request: Request, { params }: Params) {
  const auth = await requireGatewayAuth();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const payload = withActor(body, auth.userId);
  const res = await gatewayFetch(`/shopper/addresses/${id}`, {
    method: "PUT",
    json: payload,
  });
  return proxyGatewayResponse(res);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireGatewayToken();
  if (session instanceof Response) return session;

  const { id } = await params;
  const res = await gatewayFetch(`/shopper/addresses/${id}`, { method: "DELETE" });
  return proxyGatewayResponse(res);
}
