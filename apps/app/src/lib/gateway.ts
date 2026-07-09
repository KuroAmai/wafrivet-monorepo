const DEFAULT_GATEWAY =
  "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1";

function readEnvUrl(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export const GATEWAY_URL = (
  readEnvUrl("API_URL", "NEXT_PUBLIC_API_URL") ?? DEFAULT_GATEWAY
).replace(/\/$/, "");

/** Hostname only — safe for error responses and logs. */
export function getGatewayHostForLog(): string {
  try {
    return new URL(GATEWAY_URL).host;
  } catch {
    return "unknown";
  }
}
