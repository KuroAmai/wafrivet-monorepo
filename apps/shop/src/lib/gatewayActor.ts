import { gatewayFetch } from "@/lib/gatewayAuth";

export async function getGatewayUserId(): Promise<string | undefined> {
  const res = await gatewayFetch("/auth/me");
  const data = (await res.json().catch(() => ({}))) as {
    id?: string;
    user?: { id?: string };
  };
  if (!res.ok) return undefined;
  return data.id ?? data.user?.id;
}

export function withActor<T extends Record<string, unknown>>(
  body: T,
  actorUserId: string,
): T & { actor: { actorUserId: string } } {
  return {
    ...body,
    actor: { actorUserId },
  };
}
