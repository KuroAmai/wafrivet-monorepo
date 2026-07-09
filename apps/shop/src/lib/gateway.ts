const DEFAULT_GATEWAY =
  "http://localhost:3000/api/v1";

export const GATEWAY_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  DEFAULT_GATEWAY
).replace(/\/$/, "");
