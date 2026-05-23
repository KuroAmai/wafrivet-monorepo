const DEFAULT_GATEWAY =
  "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1";

const DEFAULT_CORE = "https://wafrivet-core-wdvfp4toqa-ew.a.run.app";

const DEFAULT_FIELD_VET =
  "https://wafrivet-field-vet-wdvfp4toqa-ew.a.run.app";

function readEnv(key: string): string | undefined {
  try {
    if (typeof process !== "undefined" && process.env?.[key]) {
      return process.env[key];
    }
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as { env?: Record<string, string | undefined> };
    return im.env?.[key];
  } catch {
    /* noop */
  }
  return undefined;
}

export const API_CONFIG = {
  gatewayUrl: (
    readEnv("NEXT_PUBLIC_API_URL") ??
    readEnv("VITE_API_URL") ??
    DEFAULT_GATEWAY
  ).replace(/\/$/, ""),
  coreUrl: (
    readEnv("NEXT_PUBLIC_CORE_URL") ??
    readEnv("VITE_CORE_URL") ??
    DEFAULT_CORE
  ).replace(/\/$/, ""),
  fieldVetUrl: (
    readEnv("NEXT_PUBLIC_FIELD_VET_URL") ??
    readEnv("VITE_FIELD_VET_URL") ??
    DEFAULT_FIELD_VET
  ).replace(/\/$/, ""),
  /** Gateway herd prefix until backend confirms otherwise */
  herdBasePath: "/herd",
};
