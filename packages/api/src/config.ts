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

const DEFAULT_APP_URL = "https://app.wafrivet.com";

export const API_CONFIG = {
  gatewayUrl: (
    readEnv("NEXT_PUBLIC_API_URL") ??
    readEnv("VITE_API_URL") ??
    DEFAULT_GATEWAY
  ).replace(/\/$/, ""),
  /** Same-origin auth BFF for refresh (shared *.wafrivet.com session cookies). */
  authBffUrl: (
    readEnv("NEXT_PUBLIC_APP_URL") ??
    readEnv("VITE_APP_URL") ??
    DEFAULT_APP_URL
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
  fieldVetWsUrl: (() => {
    const explicit =
      readEnv("NEXT_PUBLIC_FIELD_VET_WS_URL") ?? readEnv("VITE_FIELD_VET_WS_URL");
    if (explicit) return explicit.replace(/\/$/, "");
    const base = (
      readEnv("NEXT_PUBLIC_FIELD_VET_URL") ??
      readEnv("VITE_FIELD_VET_URL") ??
      DEFAULT_FIELD_VET
    ).replace(/\/$/, "");
    if (base.startsWith("https://")) return `wss://${base.slice("https://".length)}`;
    if (base.startsWith("http://")) return `ws://${base.slice("http://".length)}`;
    return base;
  })(),
  /** Gateway herd prefix until backend confirms otherwise */
  herdBasePath: "/herd",
};
