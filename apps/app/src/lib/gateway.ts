const DEFAULT_GATEWAY =
  "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1";

export const GATEWAY_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  DEFAULT_GATEWAY
).replace(/\/$/, "");
