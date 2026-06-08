import { applyAuthBffCors, authBffPreflightResponse } from "@/lib/authBffCors";
import { refreshSessionViaGateway } from "@/lib/gatewayAuthRefresh";

export async function OPTIONS(request: Request) {
  return authBffPreflightResponse(request);
}

export async function POST(request: Request) {
  const response = await refreshSessionViaGateway();
  return applyAuthBffCors(request, response);
}
