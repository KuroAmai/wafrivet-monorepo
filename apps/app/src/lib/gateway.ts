export const GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1";
