/** When true, UI may show embedded demo data if API calls fail. */
export function isMockDataEnabled(): boolean {
  try {
    if (typeof process !== "undefined") {
      if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true") return true;
      if (process.env.VITE_ENABLE_MOCK_AUTH === "true") return true;
    }
  } catch {
    /* noop */
  }
  try {
    const im = import.meta as unknown as { env?: Record<string, string | undefined> };
    if (im.env?.NEXT_PUBLIC_ENABLE_MOCK_AUTH === "true") return true;
    if (im.env?.VITE_ENABLE_MOCK_AUTH === "true") return true;
  } catch {
    /* noop */
  }
  return false;
}
